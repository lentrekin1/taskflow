export const mockClient = {
  currentUser: jest.fn(),
  SignIn: () => <div>Sign In</div>,
  SignUp: () => <div>Sign Up</div>,
  UserButton: () => <div>User Button</div>,
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  auth: () => ({
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    getToken: () => 'test-token',
  }),
} 