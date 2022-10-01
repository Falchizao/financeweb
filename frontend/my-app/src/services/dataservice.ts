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