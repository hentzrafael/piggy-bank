import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy, mockClear } from 'jest-mock-extended'
import prisma from './prisma'


jest.mock('./prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
  })


export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>