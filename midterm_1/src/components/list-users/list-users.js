import React, {useState, useEffect}  from 'react';
import './list-users.css';
import ReqResApi from '../../services/service';

const ListUsers = ({ loginUser, updateUser }) => {

    const reqResApi = new ReqResApi();

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        reqResApi.getUsers(1)
        .then(res => {
            setUsers(res.data);
            setTotalPages(res.total);
        });
    }, [totalPages]);

    useEffect(() => {
        for (let i = 2; i <= totalPages; i++) {
            reqResApi.getUsers(i)
            .then(res => {
                setUsers(prevUsers => {
                    return [...prevUsers, ...res.data];
                });
            });
        }
    }, [totalPages]);

    const deleteUser = (id) => {
        reqResApi.deleteUser(id)
        .then(res => {
            alert(`Status: ${res.status}`);
        });
        setUsers((usersPrev) => {
            const idx = usersPrev.findIndex(item => item.id === id);
            return [...usersPrev.slice(0, idx), ...usersPrev.slice(idx + 1)];
        });
    }


    const tableRows = users.map((user) => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td><img src={user.avatar} alt="No avatar"/></td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                    <button type="button" className="btn btn-danger" 
                        onClick={() => {deleteUser(user.id)}}>
                        Delete
                    </button>
                    <button type="button" className="btn btn-success"
                        onClick={() => {updateUser(user.id)}} 
                        >
                        Update
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div className="country-sum">
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Id</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>

        </div>
    );
}

export default ListUsers;