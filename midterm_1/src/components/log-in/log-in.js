import React, {useState}  from 'react';
import './log-in.css';
import ReqResApi from '../../services/service';


const Login = ({ loginUser }) => {

    const reqResApi = new ReqResApi();


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
        reqResApi.postData({email, password}, 'login')
        .then((res) => {
            if (res.hasOwnProperty('error')) {
                alert(res.error);
            } else {
                loginUser(true);
                localStorage.setItem('loggedInToken', res.token)
            }  
        });
    }

    return (
        <form className="item-add-form" onSubmit={onSubmit}>
                <h3>Log in</h3>
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
                Log in</button>
        </form>

    );
}

export default Login;