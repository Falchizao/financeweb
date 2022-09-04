import { user } from './user';

export type account = {
    user: user;
    code: string;
    bank_branch: string;
    bank: string;
    accountType: number;
}