import editbtn from '../../assets/img/icon-edit.svg'
import './styles.css'

function EditButton(){
    return(
        <div className="falchi-edit-btn">
            <img src={editbtn} alt="Edit" />    
        </div>
    )
}

export default EditButton