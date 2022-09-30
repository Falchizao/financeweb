import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { Category } from "../../types/category";
import { BASE_URL } from "../../utils/requests";
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"

function CategoryCard() {

    const [categories, setCategories] = useState<Category[]>([]);
    const categoriesUrl = '/api/category';

    useEffect(() => {
        axios.get(`${BASE_URL}/api/category`)
            .then(response => {
                setCategories(response.data);
            });
    }, []);

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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(categorie => {
                            return (
                                <tr key={categorie.id}>
                                    <td>{categorie.name}</td>
                                    <td>
                                        <EditButton id={categorie.id}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={categorie.id} url={categoriesUrl} />
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