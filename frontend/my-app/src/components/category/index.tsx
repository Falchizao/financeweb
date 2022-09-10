import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"

function CategoryPage(){
    return(
        <>
            <h1>Account Page</h1>
            <h1>Add a new Category or edit it</h1>
            <AddButton/ >
            <EditButton/>
            <DeleteButton/>
        </>
    )
}

export default CategoryPage