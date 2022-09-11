import AccountCard from "../accountCard"
import './styles.css'

function AccountPage(){
    return(
        <>
            <section id="accounts">
                <div className="falchi-container">
                    <AccountCard/>
                </div>
            </section>
        </>
    )
}

export default AccountPage