import {useState, useEffect} from 'react';
import {collection, onSnapshot, query, where, orderBy, limit} from 'firebase/firestore';
import { db } from '../firebase';
import {useAuth} from '../context/AuthContext';

const useExpenses = () => {
    const {user} = useAuth();
    const [expenses, setExpenses] = useState([]);
    const getExpenses = async() => {
        const expenseCollectionRef = collection(db, 'gastos')
        const queryData = query(expenseCollectionRef, where('uidUser', '==', user.uid), orderBy('date', 'desc'), limit(10))
        await onSnapshot(queryData, doc =>{
            console.log(doc.docs[0].data());
        });
    }
    useEffect(() => {
        getExpenses()
    }, [])
    return [expenses];
}

export default useExpenses
