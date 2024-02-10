import { Account } from "./account";

describe("Test the Account model", () => {
  it("create a valid Account", () => {
    const newAccount = new Account({
        balance: "0",
        name: "Savings",
        id: "1",
        userId: "1"
    });

    expect(newAccount.balance).toEqual(0);
    expect(newAccount.name).toEqual("Savings");
    expect(newAccount.id).toEqual("1");
    expect(newAccount.userId).toEqual("1");
  });
});