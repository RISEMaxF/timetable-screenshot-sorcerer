# Train Management System - Architecture & Design Documentation

## System Overview

This is a sophisticated React-based train management application built with modern web technologies, implementing Clean Architecture principles with a focus on real-time data synchronization and user experience.

## Development Environment Context

### Frontend-Only Development Reality
**IMPORTANT**: Working in isolated frontend environment without backend access. Backend is fully implemented and running separately (FastAPI + Kafka + PostgreSQL on localhost:8000) but cannot be tested directly in this environment.

### Environment Configuration Strategy
```typescript
// Default to mock data in development environment
const useRealApi = import.meta.env.PROD || import.meta.env.VITE_USE_REAL_API === 'true';
// This defaults to InMemoryTrainRepository for development
```

### Mock Data as Source of Truth
trainData.ts represents exact backend structure:
```typescript
// Real backend response format:
{
  "trains": [{
    "id": "20250719.10",
    "advertised_train_number": "10",  // Maps to announcedTrainNumber
    "operator": "Unknown",
    "from": "Ljun",
    "to": null,
    "country": "SE",
    "track": "e",
    "latest": "Last train_departed_from_station at Ljun",
    "highlighted": false,
    "completed": false,
    "createdAt": "2025-07-07T12:07:52.896975",
    "updatedAt": "2025-07-04T22:17:49.167000"
  }],
  "total": 1,
  "hasMore": false
}
```

### Missing Backend Endpoints (Design Ready)
Frontend is prepared for these endpoints that need backend implementation:
- `GET /api/v1/trains/simplified/search` - Advanced search with filters
- `PUT /api/v1/trains/simplified/{id}` - Update individual train
- `DELETE /api/v1/trains/simplified/{id}` - Delete train
- `PUT /api/v1/trains/simplified/batch` - Batch operations
- `GET /api/v1/trains/stations` - Station dropdown data
- `GET /api/v1/trains/operators` - Operator dropdown data
- `GET /api/v1/events/stream` - Real-time SSE stream

### React Query Decision Points
Three options available:
1. **Implement React Query** (Recommended) - Add useQuery hooks for better caching
2. **Remove React Query** - Uninstall dependency if not needed
3. **Hybrid Approach** - Keep custom loaders + React Query for simple calls

### Environment Variables
```bash
# .env.example (Frontend-only development)
VITE_API_URL=http://localhost:8000
VITE_USE_REAL_API=false          # Always false in development environment
VITE_ENABLE_REAL_TIME=false      # Can't test real-time connections
VITE_LOG_LEVEL=debug
VITE_MOCK_DELAY_MS=300           # Simulate API delay for realistic UX
```

### Testing Strategy (Without Backend)
```typescript
// Mock API responses matching real backend format
export const mockTrainResponse = {
  trains: [/* exact backend format */],
  total: 1,
  hasMore: false
};

// Integration tests with mocked fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTrainResponse),
  })
);
```

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context + Custom Hooks + React Query
- **Data Fetching**: Custom data loader pattern with caching + @tanstack/react-query
- **Real-time**: Server-Sent Events (SSE)
- **Routing**: React Router DOM
- **Testing**: Vitest
- **Backend Integration**: FastAPI (planned/configured)

## Architecture Patterns

### 1. Clean Architecture Implementation

The system follows Clean Architecture with clear separation of concerns:

```
src/
├── entities/           # Core business entities (Train.ts)
├── repositories/       # Data access interfaces
├── services/          # Business logic and external integrations
├── adapters/          # Data transformation layer
├── components/        # UI components (presentation layer)
├── hooks/             # Custom React hooks
├── providers/         # React context providers
└── pages/             # Route components
```

### 2. Entity-Repository Pattern

**Core Entity**: `TrainEntity` - Central business object with complete type safety
- Properties: id, announcedTrainNumber, operator, stations, times, tracks, status
- Immutable data structure with transformation methods

**Repository Pattern**: `TrainRepository` interface with multiple implementations:
- `InMemoryTrainRepository` - Development/testing
- `FastApiTrainService` - Production API integration

### 3. Data Loading Strategy

**Enhanced Data Loader Pattern**:
- `BaseDataLoader<T, P>` - Generic base class with caching
- `EnhancedTrainDataLoader` - Train-specific implementation
- Automatic cache invalidation and real-time updates
- Pagination and filtering support

## Data Flow Architecture

### 1. State Management Flow

```
TrainDataProvider (Context)
├── EnhancedTrainDataLoader
├── FastApiTrainService / InMemoryRepository
├── RealTimeService (SSE connection)
└── Component State Updates
```

### 2. Real-Time Data Synchronization

**Real-Time Service Features**:
- Server-Sent Events (SSE) connection
- Automatic reconnection with exponential backoff
- Event-based subscriptions (train_updated, train_created, train_deleted)
- Connection status monitoring
- Heartbeat mechanism

**Integration Points**:
- `TrainDataProvider` manages real-time state
- `useRealTimeTrains` hook for component integration
- Automatic cache invalidation on data changes

### 3. React Query Integration

**Query Client Setup**:
- `@tanstack/react-query` for server state management
- Global QueryClient instance with caching strategies
- Automatic background refetching and stale-while-revalidate patterns
- Optimistic updates and error handling

### 4. Component Communication

**Context-Based Architecture**:
- `TrainDataProvider` - Global train data state
- `FavoritesContext` - User preferences  
- `ThemeProvider` - UI theming
- `QueryClientProvider` - React Query state

**Custom Hooks Pattern**:
- `useTrainData()` - Access train data and operations
- `useTrainFilters()` - Search and filtering logic
- `useTrainSelection()` - Multi-select functionality
- `useRealTimeTrains()` - Real-time updates
- `useTrainOperations()` - CRUD operations

## Component Architecture

### 1. Feature-Based Organization

```
components/
├── table/              # Data table components
├── toolbar/            # Search and action controls
├── dialog/             # Modal dialogs and forms
├── datepicker/         # Date range selection
├── map/                # Geographic visualization
├── station/            # Station-specific components
└── ui/                 # Reusable UI components (shadcn)
```

### 2. Component Patterns

**Compound Components**: Complex UI elements broken into logical sub-components
- `TrainDetailDialog` + `TrainDetailHeader` + `TrainDetailSections`
- `DateRangePicker` + `DateRangeControls` + `DatePickerCalendar`

**Higher-Order Components**: Logic separation and reusability
- `EditableCell` - Inline editing functionality
- `TimeCell` - Time display with validation
- `TrackUpdateCell` - Track change handling

**Custom Hooks Integration**: Business logic abstraction
- Table components use `useTableKeyboardNavigation`
- Search components use `useTrainFilters`
- Edit components use `useEditingCell`

## API Integration Design

### 1. Service Layer Architecture

**FastApiTrainService** - Primary API integration:
- RESTful endpoints: `/api/v1/trains/simplified`
- CRUD operations with proper error handling
- Data transformation: Backend ↔ Frontend entity mapping
- Batch operations support

**Error Handling Strategy**:
- `ErrorHandlingService` - Centralized error processing
- User-friendly error messages
- Automatic retry mechanisms
- Graceful degradation

### 2. Environment Configuration

**Flexible Configuration**:
- Development: Mock data with `InMemoryTrainRepository`
- Production: Real API with `FastApiTrainService`
- Environment variables: `VITE_API_URL`, `VITE_USE_REAL_API`

## UI/UX Design System

### 1. Design Token System

**Semantic Color System** (index.css):
- HSL-based color palette
- Dark/light mode support
- Consistent theming across components
- CSS custom properties for maintainability

**Component Variants**:
- shadcn/ui components with custom variants
- Button, Card, Dialog, Input variants
- Consistent spacing and typography scales

### 2. Responsive Design Strategy

**Mobile-First Approach**:
- Tailwind responsive utilities
- `use-mobile` hook for device detection
- Adaptive layouts and interactions
- Touch-friendly interface elements

**Progressive Enhancement**:
- Core functionality works without JavaScript
- Enhanced features with React interactions
- Keyboard navigation support
- Screen reader accessibility

## Key Features & Functionality

### 1. Data Management

**Train Operations**:
- Full CRUD operations (Create, Read, Update, Delete)
- Batch updates for multiple trains
- Real-time synchronization
- Optimistic updates with rollback

**Search & Filtering**:
- Multi-field search (train number, stations, operator)
- Advanced filters (country, status, time ranges)
- Fuzzy search implementation
- Search result highlighting

### 2. User Interface Features

**Interactive Table**:
- Sortable columns with multi-sort support
- Inline editing with validation
- Keyboard navigation (arrow keys, tab)
- Row selection and batch operations

**Real-Time Updates**:
- Live data synchronization
- Visual indicators for updated trains
- Connection status monitoring
- Automatic reconnection handling

**Customization**:
- Column visibility controls
- User preferences persistence
- Favorite stations management
- Theme switching (dark/light)

## Development Patterns

### 1. Frontend-Only Development Focus

**Code Quality Standards** (Without Backend Testing):
- **Type Safety**: Extra emphasis on TypeScript correctness since backend can't be tested
- **Error Handling**: Comprehensive error scenarios and user feedback
- **Mock Accuracy**: Ensure mock data perfectly represents real backend responses
- **Future-Proof**: Write code that works seamlessly when backend is connected
- **Code Documentation**: Clear comments explaining backend integration points

### 2. Type Safety Strategy

**Comprehensive TypeScript Usage**:
- Strong typing for all entities and DTOs
- Generic components and hooks
- API response type validation
- Runtime type checking with Zod

### 2. Testing Strategy

**Multi-Level Testing**:
- Unit tests for utilities and pure functions
- Integration tests for API services
- Component testing with React Testing Library
- End-to-end testing setup (Vitest)

### 3. Performance Optimizations

**Efficient Rendering**:
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Virtual scrolling for large datasets

**Data Loading Optimizations**:
- Request caching with TTL
- Debounced search inputs
- Pagination for large datasets
- Background data prefetching

## Deployment & Configuration

### 1. Environment Setup

**Development Environment**:
- Vite dev server with HMR
- Mock data for isolated development
- TypeScript strict mode
- ESLint + Prettier configuration

**Production Configuration**:
- Environment variable injection
- API endpoint configuration
- Performance monitoring hooks
- Error boundary implementation

### 2. Scalability Considerations

**Frontend Scalability**:
- Component code splitting
- Lazy loading for routes
- Service worker for caching
- CDN asset optimization

**Backend Integration**:
- API versioning support
- Rate limiting awareness
- Circuit breaker pattern
- Graceful error handling

## Future Architecture Considerations

### 1. Planned Enhancements

**WebSocket Integration**:
- Upgrade from SSE to WebSocket for bidirectional communication
- Real-time collaborative editing
- Live cursor positions
- Instant notifications

**Offline Support**:
- Service worker implementation
- IndexedDB for local storage
- Sync queue for offline actions
- Progressive Web App features

### 2. Monitoring & Observability

**Performance Monitoring**:
- Web Vitals tracking
- User interaction analytics
- Error tracking and reporting
- API performance metrics

**Business Intelligence**:
- User behavior tracking
- Feature usage analytics
- Performance bottleneck identification
- A/B testing framework

## Summary

This train management system demonstrates modern React architecture best practices with:

- **Clean separation of concerns** through layered architecture
- **Type-safe development** with comprehensive TypeScript usage
- **Real-time capabilities** with robust SSE implementation
- **Scalable component architecture** with reusable patterns
- **Production-ready infrastructure** with proper error handling and testing

The system is designed for maintainability, scalability, and excellent user experience while maintaining code quality and architectural integrity.