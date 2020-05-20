import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';
import './register.css';
import ReqResApi from '../../services/service';


const Register = ({ loginUser }) => {

    const reqResApi = new ReqResApi();

    const history = useHistory();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        reqResApi.postData({email, password}, 'register')
        .then((res) => {
            console.log(res);
            if (res.hasOwnProperty('error')) {
                alert(res.error);
            } else {
                localStorage.setItem('loggedInToken', res.token)
                loginUser(true);
                history.push('/');
            } 
        })
        
    
    }

    return (
        <form className="item-add-form" onSubmit={onSubmit}>
                <h3>Register</h3>
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter email"
                    onChange={onEmailChange}
                    value={email}
                    />
                <input type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    onChange={onPasswordChange}
                    value={password}
                    />
                <button 
                    className="btn btn-primary"
                    >
                Register</button>
        </form>

    );
}

export default Register;