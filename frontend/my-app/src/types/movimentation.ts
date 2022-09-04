import { category } from './category';
import { account } from './account';

export type movimentation = {
    account: account;
    value: number;
    paidValue: number;
    due_date: string;
    paymentDate: string;
    category: category;
    description: string;
    transactionType: number;
}