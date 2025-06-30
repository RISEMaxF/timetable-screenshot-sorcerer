
export interface DataLoader<T, P = void> {
  load(params?: P): Promise<T>;
  reload(): Promise<T>;
  isLoading(): boolean;
  getError(): Error | null;
}

export abstract class BaseDataLoader<T, P = void> implements DataLoader<T, P> {
  private data: T | null = null;
  private loading = false;
  private error: Error | null = null;
  private lastFetch: number = 0;
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  abstract fetchData(params?: P): Promise<T>;

  async load(params?: P): Promise<T> {
    if (this.shouldUseCache()) {
      return this.data!;
    }

    if (this.loading) {
      // Wait for ongoing request
      while (this.loading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.data) return this.data;
    }

    return this.reload(params);
  }

  async reload(params?: P): Promise<T> {
    this.loading = true;
    this.error = null;

    try {
      this.data = await this.fetchData(params);
      this.lastFetch = Date.now();
      return this.data;
    } catch (error) {
      this.error = error instanceof Error ? error : new Error('Unknown error');
      throw this.error;
    } finally {
      this.loading = false;
    }
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): Error | null {
    return this.error;
  }

  private shouldUseCache(): boolean {
    return this.data !== null && 
           Date.now() - this.lastFetch < this.cacheTimeout;
  }

  setCacheTimeout(timeout: number): void {
    this.cacheTimeout = timeout;
  }
}
