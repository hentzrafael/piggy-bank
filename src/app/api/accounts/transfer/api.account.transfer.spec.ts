import { prismaMock } from '@/common/singleton';
import { POST } from './route';

describe('POST Handler', () => {
    it('responds with 404 when origin account is not found', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                originId: undefined,
                destinationId: "long-uuid",
                amount: "2"
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

    it('responds with 404 when destination account is not found', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                originId: "long-uuid",
                destinationId: undefined,
                amount: "2"
            })
        };

        const mockAccount: any = {
            "id": "long-uuid",
            "balance": "25",
            "name": "Savings",
            "userId": "long-uuid"
        }

        const NextResponseMock: any = {
            json: jest.fn()
        };

        jest.spyOn(prismaMock.account, "update").mockResolvedValueOnce(mockAccount).mockResolvedValueOnce(null!);
        const res = await POST(mockReq, NextResponseMock);
        const data = await res.json();
        expect(data.statusCode).toBe(404);
    });

    it('transfer values from two accounts', async () => {
        const mockReq: any = {
            json: jest.fn().mockReturnValue({
                originId: "long-uuid",
                destinationId: "long-uuid",
                amount: "2"
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
                originId: "long-uuid",
                destinationId: "long-uuid",
                amount: "2"
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