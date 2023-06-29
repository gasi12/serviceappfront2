import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLoginValue }) => {
    const navigate = useNavigate();

    useEffect(() => {
        handleLoginValue('');
        navigate('/');
    });

    return null;
};

export default Logout;
