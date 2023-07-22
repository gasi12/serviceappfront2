import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import AddServiceForm from "./AddServiceFrom";
import ServiceTable from "./ServiceTable";
import LoginPage from "./LoginPage";
import Logout from "./Logout";
import "./NewCss.css"
import Chat from "./Chat";

function App() {
    const [login, setLogin] = useState(localStorage.getItem('loginValue'));
    const navigate = useNavigate();

    const handleLoginValue = (value) => {
        setLogin(value);
        localStorage.setItem('loginValue', value);
        if (value === '') {
            navigate("/"); // Navigate to the login page
        }
    };

    const handleLogout = () => {
        handleLoginValue(''); // Set loginValue to an empty string
    };

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.navbar');
        const content = document.querySelector('.content');
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
    };

    return (
        <div className="body">
            <div className="navbar collapsed">
                <button className="openbtn" onClick={toggleSidebar}>☰</button>
                <nav>
                    <ul>
                        {login !== '' && (
                            <li>
                                <Link to="/services" className="button">Service list</Link>
                            </li>
                        )}
                        <br />
                        {login !== '' && (
                            <li>
                                <Link to="/add" className="button">Add service</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="content">
                <div className="topbar">
                    <div className="leftbar">
                        {/*<div class="napis">GPserwis</div>*/}
                    </div>
                    <div className="rightbar">
                        {login === '' ? (
                            <Link to="/" className="button login">Log in</Link>
                        ) : (
                            <>
                                <div className="zalogowany">Logged as: {login}

                                </div>
                                <div><Link to="/logout" className="button login">Logout</Link></div>

                            </>
                        )}
                    </div>
                </div>
                <div className="routes collapsed">
                    <Routes>
                        <Route path="/" element={<LoginPage handleLoginValue={handleLoginValue} />} />
                        <Route path="/logout" element={<Logout handleLoginValue={handleLoginValue} />} />
                        <Route path="/services" element={<ServiceTable />} />
                        <Route path="/add" element={<AddServiceForm />} />
                        <Route path="/chat" element={<Chat/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
