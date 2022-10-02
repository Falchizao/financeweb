import { toast } from 'react-toastify'
import addbtn from '../../assets/img/icon-delete.svg'
import './styles.css'
import { DeleteAccount, DeleteCategory } from '../../services/authservice';

type Props = {
    id: number,
    deletionSector: number
}

const sleep = () => new Promise(r => setTimeout(r, 2000));

function handleClick(deletionID : number, deletionSector: number){

    if(deletionSector){
        DeleteAccount(deletionID).then(async response => {
            toast.info("Deleted with success");
            await sleep();
            window.location.reload();
        },(error) => {
            toast.info("Esta conta possui vínculo com uma movimentação! Não foi possível finalizar a ação");
        });
        return;
    }

    DeleteCategory(deletionID).then(async response => {
        console.log(response);
        toast.info("Deleted with success");
        await sleep();
        window.location.reload();
    },(error) => {
        toast.info("Esta categoria possui vínculo com uma movimentação! Não foi possível finalizar a ação");
    });

}

function DeleteButton( {id, deletionSector} : Props ){
    return(
        <div className="falchi-del-btn" onClick={() => handleClick(id, deletionSector)}>
            <img src={addbtn} alt="Delete" />    
        </div>
    )
}

export default DeleteButton