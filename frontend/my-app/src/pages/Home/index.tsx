import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import PendingTransactions from "../../components/pendingtransactions";

function Home() {
    return (
        <>
            <NavBar/>
            <PendingTransactions/>
            <Footer />  
        </>
    );
}

export default Home;