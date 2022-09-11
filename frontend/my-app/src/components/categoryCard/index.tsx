import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../types/category";
import { BASE_URL } from "../../utils/requests";
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"

function CategoryCard() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/category`)
            .then(response => {
                setCategories(response.data.content);
            });
    }, []);

    return (
        <div className="component-card">
            <h2 className="title">Your Categories</h2>
            <div className="d-flex text-white">
                <AddButton /> <h4>  Add a new Category</h4>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr className="pe-10">
                            <th className="nd">Categories</th>
                            <th className="nd">Edit</th>
                            <th className="nd">Delete</th>
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
                                        <DeleteButton id={categorie.id}/>
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