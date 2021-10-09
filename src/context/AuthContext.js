import { useEffect } from 'react';
import {createContext, useContext, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import { authFirebase } from '../firebase';

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cancelSubscription = onAuthStateChanged(authFirebase, userFirebase =>{
            setUser(userFirebase);
            setLoading(false);
        });
        return cancelSubscription;
    }, [])

    return(
       <AuthContext.Provider value={{user}}>
        {!loading && children} 
       </AuthContext.Provider> 
    )
}
export {AuthContext, AuthProvider, useAuth}
