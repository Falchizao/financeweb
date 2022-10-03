export const getCustomParse = (formValue: any) =>{
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
        "type" : formValue.type,
        "balance" : 0
    }    
    return item;
}

export const getCustomParseMovimentation = (formValue: any) =>{
    const item = {
            "account": {
                "code": formValue.code,
                "bank_branch": formValue.bank_branch,
                "bank": formValue.bank
            },
            "value": formValue.value,
            "due_date": formValue.due_date,
            "paidValue": formValue.paidValue,
            "paymentDate": formValue.paymentDate,
            "category": {
                "name": formValue.name
            },
            "description": formValue.description,
            "type": formValue.transactionType
    }
    return item;
}
