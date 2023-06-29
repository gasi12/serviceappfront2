import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LoginPage.module.css';

const LoginPage = function ({ handleLoginValue }) {
    const [login, setLogin] = useState('');
    const navigate = useNavigate();

    function handleClick() {
        handleLoginValue(login);
        if (login === '') {
            window.alert('Login cannot be empty');
        } else {
            navigate('/services');
        }
    }

    function handleLoginChange(e) {
        e.preventDefault();
        setLogin(e.target.value);
    }

    return (
        <div className={style.LoginPage_center}>
            <h1 className={style.LoginPage_h1}>LOGIN</h1>
            <form className={style.LoginPage_form}>
                <input className={style.LoginPage_input} type="text" value={login} onChange={handleLoginChange} />
                <br />
                <input className={style.LoginPage_input} type="password" />
                <button className={style.LoginPage_button} type="submit" onClick={handleClick}>Log in</button>
            </form>

        </div>
    );

};

export default LoginPage;
