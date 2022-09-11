import { User } from './user';

export type Account = {
    id: number;
    user: User;
    code: string;
    bank_branch: string;
    bank: string;
    accountType: number;
}