export const getCustomParse = (formValue: any, typeSelected: number) =>{
    const item = {
        "user": {
            "id": 0,
            "username": JSON.parse(localStorage.getItem('@FinanceWeb::nameuser')|| '{}'),
            "displayName": "",
            "password": ""
        },
        "code": formValue.code,
        "bank_branch" : formValue.agency,
        "bank" : formValue.bank,
        "type" : typeSelected,
        "balance" : 0
    }    
    return item;
}

export const getCustomParseMovimentation = (formValue: any, typeSelected: number, accSelected: number, categorySelected: number) =>{
    const item = {
            "account": {
                "id": accSelected,
                "code": "",
                "bank_branch": "",
                "bank": ""
            },
            "value": formValue.value,
            "due_date": formValue.due_date,
            "paidValue": formValue.paidValue,
            "paymentDate": formValue.paymentDate,
            "category": {
                "id": categorySelected,
                "name": ""
            },
            "description": formValue.description,
            "type": typeSelected
    }
    return item;
}
