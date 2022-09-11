import axios from 'axios';
import { toast } from 'react-toastify';
import editbtn from '../../assets/img/icon-edit.svg'
import { BASE_URL } from '../../utils/requests';
import './styles.css'

type Props = {
    id: number
}

function handleClick(editID : number){
    axios.put(`${BASE_URL}/api/${id}`)
        .then(response => {
            toast.info("Deleted with success");
        });
}

function EditButton( {id} : Props){
    return(
        <div className="falchi-edit-btn" onClick={() => handleClick(id)}>
            <img src={editbtn} alt="Edit" />    
        </div>
    )
}

export default EditButton