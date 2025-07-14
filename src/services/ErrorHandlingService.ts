export class ApiErrorHandler {
  static handleApiError(error: any): string {
    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "Network error: Unable to connect to the server. Please check your internet connection.";
    }

    // HTTP status errors
    if (error.message?.includes('HTTP')) {
      const statusMatch = error.message.match(/HTTP (\d+)/);
      if (statusMatch) {
        const status = parseInt(statusMatch[1]);
        return this.getStatusErrorMessage(status);
      }
    }

    // Validation errors
    if (error.message?.includes('validation')) {
      return "Invalid data provided. Please check your input and try again.";
    }

    // Timeout errors
    if (error.message?.includes('timeout')) {
      return "Request timed out. Please try again.";
    }

    // Default error message
    return error.message || "An unexpected error occurred. Please try again.";
  }

  private static getStatusErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return "Bad request: The data provided is invalid.";
      case 401:
        return "Unauthorized: Please log in to access this resource.";
      case 403:
        return "Forbidden: You don't have permission to access this resource.";
      case 404:
        return "Not found: The requested resource could not be found.";
      case 409:
        return "Conflict: The resource already exists or there's a data conflict.";
      case 422:
        return "Validation error: Please check your input data.";
      case 429:
        return "Too many requests: Please wait a moment before trying again.";
      case 500:
        return "Server error: An internal server error occurred.";
      case 502:
        return "Bad gateway: The server is temporarily unavailable.";
      case 503:
        return "Service unavailable: The server is temporarily down for maintenance.";
      case 504:
        return "Gateway timeout: The server took too long to respond.";
      default:
        return `HTTP ${status}: An error occurred while processing your request.`;
    }
  }

  static logError(context: string, error: any, additionalData?: any): void {
    console.error(`[${context}] Error:`, {
      message: error.message,
      stack: error.stack,
      additionalData
    });
  }

  static async handleAsyncError<T>(
    operation: () => Promise<T>,
    context: string,
    fallback?: T
  ): Promise<T | undefined> {
    try {
      return await operation();
    } catch (error) {
      this.logError(context, error);
      if (fallback !== undefined) {
        return fallback;
      }
      throw error;
    }
  }
}