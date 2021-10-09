import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useAuth}  from '../context/AuthContext';

const PrivateRoute = ({children, ...allProperties}) => {
   const {user} = useAuth();
    if(user){
        return <Route {...allProperties}>{children}</Route>
    }else {
        return <Redirect to='/login' />
    }
}

export default PrivateRoute
