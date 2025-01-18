import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles }) {
    let token = JSON.parse(localStorage.getItem('token'));
if (!token || !token.roles.some(role => roles.includes(role))) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;