import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"

function TransactionPage(){
    return(
        <>
            <h1>Transaction Page</h1>
            <h1>Add a new Transaction</h1>
            <AddButton/ >
            <EditButton/>
            <DeleteButton/>
        </>
    )
}

export default TransactionPage