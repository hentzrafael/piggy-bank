import { prismaMock } from '@/common/singleton';
import { POST } from './route';

describe('POST Handler', () => {
    it('responds with 404 when sending undefined accountId', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                accountId: undefined,
                amount: "0"
            })
        };

        const NextResponseMock: any = {
            json: jest.fn()
        };

        jest.spyOn(prismaMock.account, "update").mockResolvedValue(null!);
        
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(404);
    });

    it('removes from an account', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                accountId: "teste",
                amout: "25",
            })
        };
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const mockAccount: any = {
            "id": "long-uuid",
            "balance": "25",
            "name": "Savings",
            "userId": "long-uuid"
        }

        jest.spyOn(prismaMock.account, "update").mockResolvedValue(mockAccount);
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(200);
    });

    it('responds with 500 when some unknown error occurs', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                accountId: "teste",
                amout: "25",
            })
        };

        jest.spyOn(prismaMock.account, "update").mockImplementation(() => { throw new Error('Some error') });
        const NextResponseMock: any = {
            json: jest.fn()
        };
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(500);
    })
});