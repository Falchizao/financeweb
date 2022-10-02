import { toast } from 'react-toastify'
import addbtn from '../../assets/img/icon-delete.svg'
import './styles.css'
import { DeleteAccount, DeleteCategory, DeleteMovimentation } from '../../services/authservice';

type Props = {
    id: number,
    deletionSector: number
}

const sleep = () => new Promise(r => setTimeout(r, 2000));

function handleClick(deletionID: number, deletionSector: number) {
    switch (deletionSector) {
        case 0: {
            DeleteAccount(deletionID).then(async response => {
                toast.info("Deleted with success");
                await sleep();
                window.location.reload();
            }, (error) => {
                toast.info("Esta conta possui vínculo com uma movimentação! Não foi possível finalizar a ação");
            });
            break;
        }
        case 1: {
            DeleteCategory(deletionID).then(async response => {
                toast.info("Deleted with success");
                await sleep();
                window.location.reload();
            }, (error) => {
                toast.info("Esta categoria possui vínculo com uma movimentação! Não foi possível finalizar a ação");
            });
            break;
        }
        case 2: {
            DeleteMovimentation(deletionID).then(async response => {
                toast.info("Deleted with success");
                await sleep();
                window.location.reload();
            }, (error) => {
                toast.info("Ocorreu um erro ao deletar essa movimentação, tente novamente!");
            }); 
            break;
        }
    }     
}

function DeleteButton({ id, deletionSector }: Props) {
    return (
        <div className="falchi-del-btn" onClick={() => handleClick(id, deletionSector)}>
            <img src={addbtn} alt="Delete" />
        </div>
    )
}

export default DeleteButton