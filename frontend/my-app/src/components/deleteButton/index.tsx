import axios from 'axios'
import { toast } from 'react-toastify'
import addbtn from '../../assets/img/icon-delete.svg'
import { BASE_URL } from '../../utils/requests'
import './styles.css'

type Props = {
    id: number
}

function handleClick(deletionID : number){
    axios.delete(`${BASE_URL}/api`)
        .then(response => {
            toast.info("Deleted with success");
        });
}

function DeleteButton( {id} : Props ){
    return(
        <div className="falchi-del-btn" onClick={() => handleClick(id)}>
            <img src={addbtn} alt="Delete" />    
        </div>
    )
}

export default DeleteButton