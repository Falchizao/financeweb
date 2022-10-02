import customAxios from "../myAxios/myCustomAxios";
import userTokenAuth from "./dataservice";
const route = "http://localhost:8085/api";

//Security
export async function UserAuthenticate(authForm: any) {
    return await customAxios.post(`${route}/authorization/register`, authForm);
}
export async function UserLogin(loginCredentials: any) {
    return await customAxios.post(`${route}/authorization/login`, loginCredentials)
        .then((response) => {
            if (response.data) {
                localStorage.setItem('@FinanceWeb::user', JSON.stringify(response.data));
                localStorage.setItem('@FinanceWeb::nameuser', JSON.stringify(loginCredentials.username));
            }
        });
}

//Accounts
export async function GetAllAccounts() {
    return await customAxios.get(`${route}/account`, { headers: userTokenAuth() });
}
export async function GetAccount(id: any) {
    return await customAxios.get(`${route}/account/${id}`, { headers: userTokenAuth() });
}
export async function AddAccount() {
    return await customAxios.delete(`${route}/account/registrar`, { headers: userTokenAuth() });
}
export async function DeleteAccount(id: any) {
    return await customAxios.delete(`${route}/account/${id}`, { headers: userTokenAuth() });
}
export async function UpdateAccount(id: any) {
    return await customAxios.put(`${route}/account/${id}`, { headers: userTokenAuth() });
}

//Categories
export async function GetCategories() {
    return await customAxios.get(`${route}/category`, { headers: userTokenAuth() });
}
export async function GetCategory(id: any) {
    return await customAxios.get(`${route}/category/${id}`, { headers: userTokenAuth() });
}
export async function AddCategory() {
    return await customAxios.delete(`${route}/category/registrar`, { headers: userTokenAuth() });
}
export async function DeleteCategory(id: any) {
    return await customAxios.delete(`${route}/category/${id}`, { headers: userTokenAuth() });
}
export async function UpdateCategory(id: any) {
    return await customAxios.put(`${route}/category/${id}`, { headers: userTokenAuth() });
}

//Movimentations
export async function GetMovimentations() {
    return await customAxios.get(`${route}/movimentation`, { headers: userTokenAuth() });
}
export async function GetMovimentation(id: any) {
    return await customAxios.get(`${route}/movimentation/${id}`, { headers: userTokenAuth() });
}
export async function AddMovimentations() {
    return await customAxios.delete(`${route}/movimentation/registrar`, { headers: userTokenAuth() });
}
export async function DeleteMovimentation(id: any){
    return await customAxios.delete(`${route}/movimentation/${id}`, { headers: userTokenAuth()});
}
export async function PendingMovimentations(dmin: string, dmax: string){
    return await customAxios.get(`${route}/movimentation/pending?minDate=${dmin}&maxDate=${dmax}`, { headers: userTokenAuth()});
}

//Logout
export const Logout = () => {
    localStorage.removeItem("@FinanceWeb::user");
    localStorage.removeItem("@FinanceWeb::nameuser");
    window.location.reload();
};


