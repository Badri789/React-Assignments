import React, {useState} from 'react';
import { Route, useHistory } from 'react-router-dom';
import './app.css';
import Register from  '../register/register';
import Login from '../log-in/log-in';
import CreateUser from '../create-user/create-user';
import ListUsers from '../list-users/list-users';
import Header from '../header/header';
import UpdateUser from '../update-user/update-user';


const App = () => {

    const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [updatedUserId, setUpdatedUserId] = useState(null);

    const loginUser = (loggedIn) => {
        setIsLoggedIn(loggedIn);
    }

    const updateUser = (id) => {
        history.push('/update');
        setUpdatedUserId(id);
    }

    const createElement = 
        isLoggedIn ? <CreateUser /> : null;
    const userList =
        isLoggedIn ? <ListUsers updateUser={updateUser}/> : null;
    const loginElement = 
        !isLoggedIn ? <Login loginUser={loginUser}/> : null;

    return (
        <div>
            <Header loggedIn={isLoggedIn}/>

            <Route path="/" render={() => {
                return (
                    <React.Fragment>        
                        {loginElement}
                        {createElement}
                        {userList}
                    </React.Fragment>
                );
            }} exact/>

            <Route path="/register" render={() =>  <Register loginUser={loginUser}/>
            } exact/>

            <Route path="/update" render={() => <UpdateUser updatedUserId={updatedUserId}/>
            } exact/>


        </div>
    );
}

export default App;


