import { Category } from "./category.entity";


export enum TransationType {
    INCOME = "income",
    EXPENSE = "expense"
}


type TransationProps = {
    _id?: string;
    title: string
    amount: number;
    date: Date;
    category: Category
    type: TransationType;
}

export class Transaction {
    public _id?: string;
    public title: string
    public amount: number;
    public date: Date;
    public category: Category
    public type: TransationType;

    constructor(props: TransationProps) {
        this._id = props._id;
        this.title = props.title;
        this.amount = props.amount;
        this.date = new Date(props.date);
        this.category = new Category(props.category);
        this.type = props.type;
    }
}