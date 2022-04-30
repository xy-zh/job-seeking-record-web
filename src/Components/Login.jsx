import React, {useContext, useState} from 'react';
import {Context} from "../Context";

function Login() {
    const [username, setUsername] = useState('');
    const {onLogin} = useContext(Context)
    return (
        <div className='login-panel'>
            <h1>Login with username</h1>
            <input value={username}
                   placeholder='Username'
                   onInput={(e) => {
                       setUsername(e.target.value);
                   }}
            />
            <button
                className='login-button'
                type='button'
                onClick={() => {
                    onLogin(username);
                    setUsername('');
                }}
            >Log In
            </button>
            <p>&#128054; DOG is not an allowed username &#128054; </p>
        </div>
    );
}

export default Login;