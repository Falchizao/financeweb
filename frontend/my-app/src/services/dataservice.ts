export default function userTokenAuth() {
    const userToken = localStorage.getItem('@FinanceWeb::user'); //bearer
    let userInfo;
    if (userToken) {
        userInfo = JSON.parse(userToken);
    }

    if (userInfo && userInfo.accessToken) {
        return { Authorization: 'Bearer ' + userInfo.accessToken };
    } else {
        return { Authorization: '' }; //Aqui vai dar pau
    }
}

export const reloadSystem = () => {
    window.location.reload();
};

//Logout
export const Logout = () => {
    localStorage.removeItem("@FinanceWeb::user");
    localStorage.removeItem("@FinanceWeb::nameuser");
    window.location.reload();
};

export const sleep = () => new Promise(r => setTimeout(r, 2000));

