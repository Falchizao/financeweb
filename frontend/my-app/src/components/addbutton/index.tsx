import addbtn from '../../assets/img/add-icon.svg'
import AccountModal from '../AccountModal'
import './styles.css'

function handleClick(){
    // axios.put(`${BASE_URL}/api/${editID}`)
    //     .then(response => {
    //         console.log("gogogo edit saporra")
    //     });
    return(
        <AccountModal/>
    )
}

function AddButton(){
    return(
        <div className="falchi-add-btn" onClick={() => handleClick()}>
            <img src={addbtn} alt="Add" />    
        </div>
    )
}

export default AddButton