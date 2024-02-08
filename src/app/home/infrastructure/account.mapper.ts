import { Account, AccountProps } from "../domain/account";

export const AccountMapper = {
    toDomain: (account: AccountProps) => {
        return new Account({
            id: account.id,
            name: account.name,
            balance: account.balance,
            userId: account.userId
        });
    }
}