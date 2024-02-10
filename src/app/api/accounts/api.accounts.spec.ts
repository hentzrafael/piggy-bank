import { GET, POST } from './route';
import { prismaMock } from '@/common/singleton';

describe('GET Handler', () => {
    it('responds with the 404 when sending empty username', async () => {
        const mockReq: any = {
            nextUrl: {
                searchParams: {
                    get: jest.fn().mockReturnValue(undefined)
                }
            }
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await GET(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(404);
    });

    it('responds with the 500 when sending username and some error occurs', async () => {
        const mockReq: any = {
            nextUrl: {
                searchParams: {
                    get: jest.fn().mockReturnValue('username')
                }
            }
        };

        const NextResponseMock: any = {
            json: jest.fn()
        };
        jest.spyOn(prismaMock.user, "findUnique").mockImplementation(() => { throw new Error('Some error') });
        const res = await GET(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(500);
    });

    it('responds with the 200 when sending username', async () => {
        const mockReq: any = {
            nextUrl: {
                searchParams: {
                    get: jest.fn().mockReturnValue('username')
                }
            }
        };

        const mockUser: any = {
            "id": "long-uuid",
            "username": "username",
            "password": "username123",
            "accounts": [
                {
                    "id": "long-uuid",
                    "balance": "0",
                    "name": "Savings",
                    "userId": "long-uuid"
                },
                {
                    "id": "long-uuid",
                    "balance": "0",
                    "name": "Checkings",
                    "userId": "long-uuid"
                }]
        }



        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(mockUser);
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await GET(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(200);
    })
});

describe('POST Handler', () => {
    it('responds with 404 when sending empty username', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: undefined,
                balance: "0",
                name: "Savings"
            })
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };

        

        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(null);
        
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(404);
    });

    it('creates an account', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: "teste",
                balance: "0",
                name: "Savings"
            })
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const mockAccount: any = {
            "id": "long-uuid",
            "balance": "0",
            "name": "Savings",
            "userId": "long-uuid"
        }

        const mockUser: any = {
            "id": "long-uuid",
            "username": "teste",
            "password": "some-password",
        }

        jest.spyOn(prismaMock.account, "create").mockResolvedValue(mockAccount);
        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(mockUser);
        
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(200);
    });

    it('responds with 500 when some unknown error occurs', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: "teste",
                balance: "0",
                name: "Savings"
            })
        };

        jest.spyOn(prismaMock.user, "findUnique").mockImplementation(() => { throw new Error('Some error') });
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(500);
    })
});