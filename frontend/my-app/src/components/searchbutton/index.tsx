import axios from 'axios'
import { toast } from 'react-toastify'
import searchbtn from '../../assets/img/icons8-search.svg'
import { BASE_URL } from '../../utils/requests'
import './styles.css'

type Props = {
    url: string,
    minDate: Date,
    maxDate: Date
}

function handleClick(url: string, minDate: Date, maxDate: Date){
    const dmin = minDate.toISOString().slice(0, 10);
    const dmax = maxDate.toISOString().slice(0, 10);

    let urlfind = BASE_URL.concat(url);
    axios.get(`${urlfind}/pending?minDate=${dmin}&maxDate=${dmax}`)
        .then(response => {
        });
}

function SearchButton( {url, minDate, maxDate} : Props ){
    return(
        <div className="falchi-search-btn" onClick={() => handleClick(url, minDate, maxDate)}>
            <img src={searchbtn} alt="Search" />    
        </div>
    )
}

export default SearchButton