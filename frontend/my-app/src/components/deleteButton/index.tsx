import addbtn from '../../assets/img/icon-delete.svg'
import './styles.css'

function DeleteButton(){
    return(
        <div className="falchi-del-btn">
            <img src={addbtn} alt="Delete" />    
        </div>
    )
}

export default DeleteButton