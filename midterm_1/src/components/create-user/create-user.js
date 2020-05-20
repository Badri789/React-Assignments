import React, {useState}  from 'react';
import './create-user.css';
import ReqResApi from '../../services/service';


const CreateUser = () => {

    const reqResApi = new ReqResApi();


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
        reqResApi.postData({name, job}, 'users')
        .then((res) => {
            alert(`Id: ${res.id}\nDate: ${res.createdAt}`);
        });
    }

    return (
        <form className="item-add-form" onSubmit={onSubmit}>
                <h3>Create User</h3>
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
                Create</button>
        </form>

    );
}

export default CreateUser;
