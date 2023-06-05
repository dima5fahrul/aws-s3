import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:3000/mahasiswa");
        setUsers(response.data);
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/mahasiswa/${id}`);
            getUsers();
        } catch (error){ 
            console.error(error);
        }
    }

    return (
        <div className="columns">
            <div className="column is-half">
                <Link to="add" className="button is-success">
                    Add New
                </Link>
                <table className="table is-strpped is-fullwidth mt-5">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{ index + 1 }</td>
                                <td>{ user.name }</td>
                                <td>{ user.email }</td>
                                <td>{ user.gender }</td>
                                <td>
                                    <Link to={`edit/${user.id}`} className="button is-small is-info mr-2">Edit</Link>
                                    <button onClick={ () => deleteUser(user.id)} className="button is-danger is-info mr-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;