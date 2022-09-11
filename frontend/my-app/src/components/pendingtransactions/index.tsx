import PendingTransactionsCard from "../pendingTransactionCard"
import './styles.css'

function PendingTransactions(){
    return(
        <>
            <section id="pending">
                <div className="falchi-container">
                    <PendingTransactionsCard/>
                </div>
            </section>
        </>
    )
}

export default PendingTransactions