import addbtn from '../../assets/img/add-icon.svg'
import './styles.css'
import { useNavigate } from 'react-router-dom';

type Props = {
    addSector: number
}

function AddButton({ addSector }: Props) {
    const navigate = useNavigate();

    function handleClick(addSector: number) {

        switch (addSector) {
            case 0: { //Account
                navigate("/Register/Account");
                window.location.reload();
                break;
            }
            case 1: { //Category
                navigate("/Register/Category");
                window.location.reload();
                break;
            }
            case 2: { //Movimentation
                navigate("/Register/Movimentation");
                window.location.reload();
                break;
            }
        }
    }

    return (
        <div className="falchi-add-btn" onClick={() => handleClick(addSector)}>
            <img src={addbtn} alt="Add" />
        </div>
    )
}

export default AddButton