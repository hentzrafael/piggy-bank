import { Account } from "../domain/account";
import { AccountMapper } from "./account.mapper";

describe("Test the AccountMapper data mapping", () => {
    it("should map valid objects into Account instances", () => {
        const fetchAllMock = [
            {
                id: "long-uuid",
                balance: "-1",
                name: "Checkings",
                userId: "long-uuid"
            },
            {
                id: "long-uuid",
                balance: "250",
                name: "Savings",
                userId: "long-uuid"
            }
        ];

        const domainData = fetchAllMock.map(AccountMapper.toDomain);
        domainData.forEach((data) => {
            expect(data).toBeInstanceOf(Account);
            expect(data.balance).toBeDefined();
            expect(data.name).toBeDefined();
            expect(data.userId).toBeDefined();
            expect(data.id).toBeDefined();
        });
    });
});