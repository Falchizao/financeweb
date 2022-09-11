import TransactionsCard from "../transactionCard"
import './styles.css'

function TransactionPage(){
    return(
        <>
            <section id="movimentations">
                <div className="falchi-container">
                    <TransactionsCard/>
                </div>
            </section>
        </>
    )
}

export default TransactionPage