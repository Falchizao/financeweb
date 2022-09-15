import axios from 'axios'
import { toast } from 'react-toastify'
import addbtn from '../../assets/img/icon-delete.svg'
import { BASE_URL } from '../../utils/requests'
import './styles.css'

type Props = {
    id: number,
    url: string
}

function handleClick(deletionID : number, url: string){
    let urlDel = BASE_URL.concat(url);
    axios.delete(`${urlDel}/${deletionID}`)
        .then(response => {
            toast.info("Delete with success");
        });
}

function DeleteButton( {id, url} : Props ){
    return(
        <div className="falchi-del-btn" onClick={() => handleClick(id, url)}>
            <img src={addbtn} alt="Delete" />    
        </div>
    )
}

export default DeleteButton