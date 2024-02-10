export type AccountProps = {
    id: string;
    balance:string;
    name: string;
    userId: string;
  };

export class Account {
    id: string;
    balance: number;
    name: string;
    userId: string;
    
    constructor(props: AccountProps) {
        this.id = props.id;
        this.balance = Number.parseFloat(props.balance);
        this.name = props.name;
        this.userId = props.userId;
    }
}