import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { mockClient } from '@/tests/mocks/clerk'

global.TextEncoder = TextEncoder as typeof global.TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock Clerk
jest.mock('@clerk/nextjs', () => mockClient)

// Mock Next Navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  redirect: jest.fn(),
})) 