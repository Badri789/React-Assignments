import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import ReqResApi from '../../services/service';


const UpdateUser = ({ updatedUserId }) => {

    const reqResApi = new ReqResApi();

    const history = useHistory();

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onJobChange = (event) => {
        setJob(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        reqResApi.updateUser({name, job}, updatedUserId)
        .then((res) => {
            alert(`Updated at: ${res.updatedAt}`);
        });
        history.push('/');
    }

    return (
        <form className="item-add-form" onSubmit={onSubmit}>
                <h3>Update User</h3>
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter name"
                    onChange={onNameChange}
                    value={name}
                    />
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter Job"
                    onChange={onJobChange}
                    value={job}
                    />
                <button 
                    className="btn btn-primary"
                    >
                Update</button>
        </form>

    );
}

export default UpdateUser;