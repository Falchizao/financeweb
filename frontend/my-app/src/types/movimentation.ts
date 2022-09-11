import { Category } from './category';
import { Account } from './account';

export type Movimentation = {
    account: Account;
    value: number;
    paidValue: number;
    due_date: string;
    paymentDate: string;
    category: Category;
    description: string;
    transactionType: number;
}