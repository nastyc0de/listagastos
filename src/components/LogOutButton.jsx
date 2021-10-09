import React from 'react';
import { ReactComponent as LogOutIcon } from '../images/log-out.svg';
import { Boton } from './Boton';
import { signOut } from "firebase/auth";
import {authFirebase} from '../firebase';
import { useHistory } from 'react-router';




const LogOutButton = () => {
    const history = useHistory()
    const logOut = async() => {
        try{
            await signOut(authFirebase)
            history.push('/login')
        } catch(error)
        {
            console.log(error);
        }
    }
    return (
        <Boton iconoGrande as='button' onClick={logOut}>
            <LogOutIcon/>
            
        </Boton>
            
    )
}

export default LogOutButton
