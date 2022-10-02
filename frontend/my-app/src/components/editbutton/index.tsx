import editbtn from '../../assets/img/icon-edit.svg'
import './styles.css'

type Props = {
    id: number
}

function handleClick(editID : number){


}

function EditButton( {id} : Props){
    return(
        <div className="falchi-edit-btn" onClick={() => handleClick(id)}>
            <img src={editbtn} alt="Edit" />    
        </div>
    )
}

export default EditButton