import addbtn from '../../assets/img/add-icon.svg'
import './styles.css'

function AddButton(){
    return(
        <div className="falchi-add-btn">
            <img src={addbtn} alt="Add" />    
        </div>
    )
}

export default AddButton