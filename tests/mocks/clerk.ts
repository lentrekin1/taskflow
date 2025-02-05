import React from 'react'

export const mockClient = {
  currentUser: jest.fn(),
  SignIn: () => React.createElement('div', null, 'Sign In'),
  SignUp: () => React.createElement('div', null, 'Sign Up'),
  UserButton: () => React.createElement('div', null, 'User Button'),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  auth: () => ({
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    getToken: () => 'test-token',
  }),
} 