import { useEffect, useState } from "react";
import { Category } from "../../types/category";
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GetCategories } from '../../services/authservice';

function CategoryCard() {
    let navigate: NavigateFunction = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user'); 
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }
        GetCategories().then(response => {
            setCategories(response.data);
        });
    }, [navigate]);

    return (
        <div className="component-card">
            <h2 className="title">Your Categories</h2>
            <div className="d-flex text-white">
                <div className="me-3"><h4>Add a new Category</h4></div>
                <div><AddButton /></div>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Categories</th>
                            {/* <th>Edit</th> */}
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(categorie => {
                            return (
                                <tr key={categorie.id}>
                                    <td>{categorie.name}</td>
                                    {/* <td>
                                        <EditButton id={categorie.id}/>
                                    </td> */}
                                    <td>
                                        <DeleteButton id={categorie.id} deletionSector={0} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryCard