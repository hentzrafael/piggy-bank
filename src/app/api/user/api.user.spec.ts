import { GET, POST } from './route';
import { prismaMock } from '@/common/singleton';

describe('POST Handler', () => {
    it('responds with the 404 when sending empty username', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: undefined,
                password: "some-password"
            })
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };
        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(null);
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(401);
    });

    it('responds with the 500 when sending username and some error occurs', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: undefined,
                password: "some-password"
            })
        };

        const NextResponseMock: any = {
            json: jest.fn()
        };
        jest.spyOn(prismaMock.user, "findUnique").mockImplementation(() => { throw new Error('Some error') });
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(500);
    });

    it('responds with 401 when sending different password', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: "username",
                password: "some-password"
            })
        };

        const mockUser: any = {
            "id": "long-uuid",
            "username": "username",
            "password": "username123",
        }



        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(mockUser);
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(401);
    });
    it('responds with 200 when sending correct values', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                username: "username",
                password: "some-password"
            })
        };

        const mockUser: any = {
            "id": "long-uuid",
            "username": "username",
            "password": "some-password",
        }



        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(mockUser);
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(200);
    })
});

describe('GET Handler', () => {
    it('responds with 404 when sending empty username', async () => {
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

    it('returns a user when sending username', async () => {
        const mockReq: any = {
            nextUrl: {
                searchParams: {
                    get: jest.fn().mockReturnValue("username")
                }
            }
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };

        const mockUser: any = {
            "id": "long-uuid",
            "username": "teste",
            "password": "some-password",
        }

        jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(mockUser);
        
        const res = await GET(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.id).toBeDefined();
        expect(data.username).toBeDefined();
        expect(data.password).toBeDefined();
    });
});