# TaskFlow - Modern Task Management Application

A full-stack task management application built with Next.js 14, demonstrating modern web development practices and architectural patterns. This project serves as a technical demonstration of building scalable, performant web applications with React and TypeScript.

## Technical Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom UI components
- **State Management**: Server Components + React Server Actions
- **Authentication**: Clerk
- **Forms**: React Server Actions with Progressive Enhancement

### Backend
- **Database**: PostgreSQL with Prisma ORM on Supabase
- **API**: Next.js Server Actions
- **Authentication**: Clerk
- **Caching**: Next.js Cache and Revalidation

### Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: Component, Integration, and Unit Tests
- **Mocking**: Custom mocks for Clerk Auth and Next.js Router
- **CI Integration**: Automated testing on pull requests

## Key Features

- **Modern Authentication**
  - Secure user authentication with Clerk
  - Protected routes and API endpoints
  - Role-based access control

- **Real-time Project Management**
  - Create and manage projects
  - Assign and track tasks
  - Real-time status updates
  - Team collaboration features

- **Optimized Performance**
  - Server-side rendering with Next.js
  - Optimistic updates for better UX
  - Efficient data fetching with Server Components
  - Minimal client-side JavaScript

- **Responsive Design**
  - Mobile-first approach
  - Tailwind CSS for styling
  - Consistent UI components
  - Smooth animations and transitions

## Architecture

The application follows a modern, scalable architecture:

```
app/
├── actions/          # Server actions for data mutations
├── components/       # Reusable UI components
├── lib/             # Shared utilities and database access
└── [everything else]/        # Next.js App Router pages

__tests__/
├── components/      # Component tests
├── utils/          # Test utilities
└── integration/    # Integration tests

tests/
└── mocks/          # Test mocks (Clerk, etc.)
```

### Design Patterns
- Server Components for improved performance
- Container/Presenter pattern for component organization
- Repository pattern for database access
- Progressive Enhancement for form submissions
- Optimistic UI updates for better UX

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure the following in `.env.local`:
```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

5. Initialize the database:
```bash
pnpm prisma db push
```

6. Start the development server:
```bash
pnpm dev
```

## Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Test Structure
- **Component Tests**: Test individual React components in isolation
- **Integration Tests**: Test component interactions and data flow
- **Unit Tests**: Test utility functions and helpers
- **Mock System**: Custom mocks for external dependencies

### Testing Best Practices
- Use React Testing Library's user-centric queries
- Follow the "Arrange-Act-Assert" pattern
- Mock external dependencies consistently
- Test error states and edge cases
- Maintain high test coverage

## Development Practices

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for Next.js and React best practices
- **Prettier**: Consistent code formatting
- **Testing**: Jest and React Testing Library setup

## Performance Optimizations

- Server Components to reduce client-side JavaScript
- Optimized images with next/image
- Efficient data fetching with Server Actions
- Tailwind CSS for minimal CSS bundle size
- Proper caching strategies

## Security Features

- Authentication with Clerk
- CSRF protection
- Input validation with Zod
- Secure headers with Helmet
- SQL injection prevention with Prisma

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with `git push`