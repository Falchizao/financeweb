import { toast } from 'react-toastify';
import editbtn from '../../assets/img/iconmonstr-check-mark-1.svg'
import { UpdateMovimentationAsPaid } from '../../services/authservice';
import { sleep } from '../../services/dataservice';
import './styles.css'

type Props = {
    id: number
}

function handleClick(editID : number){
    UpdateMovimentationAsPaid(editID).then(async response => {
        toast.info("Updated as paid with success!");
        await sleep();
        window.location.reload();
    }, (error) => {
        toast.info("Não foi possível realizar tal ação, tente novamente!");
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