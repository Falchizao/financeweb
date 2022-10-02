import editbtn from '../../assets/img/icon-edit.svg'
import './styles.css'

type Props = {
    id: number
}

function handleClick(editID : number){
    // axios.put(`${BASE_URL}/api/${editID}`)
    //     .then(response => {
    //         console.log("gogogo edit saporra")
    //     });

}

function EditButton( {id} : Props){
    return(
        <div className="falchi-edit-btn" onClick={() => handleClick(id)}>
            <img src={editbtn} alt="Edit" />    
        </div>
    )
}

export default EditButton