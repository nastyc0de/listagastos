import {useState, useEffect} from 'react';
import {collection, onSnapshot, query, where, orderBy, limit, startAfter} from 'firebase/firestore';
import { db } from '../firebase';
import {useAuth} from '../context/AuthContext';

const useExpenses = () => {
    const {user} = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [lastExpense, setLastExpense] = useState(null);
    const [thereIsMoreToCharge, setThereIsMoreToCharge] = useState(false);

    const getMoreExpenses = () => {
        const expenseCollectionRef = collection(db, 'gastos')
        const queryData = query(expenseCollectionRef, where('uidUser', '==', user.uid), orderBy('date', 'desc'), limit(10), startAfter(lastExpense))
        onSnapshot(queryData, snapshot =>{
            if (snapshot.docs.length > 0) {
                setLastExpense(snapshot.docs[snapshot.docs.length -1]);

                setExpenses(expenses.concat(snapshot.docs.map((expense) => {
                    return{
                        ...expense.data(),
                        id:expense.id
                    }
                })))
            } else{
                setThereIsMoreToCharge(false);
            }
        })
    }

    useEffect(() => {
        const expenseCollectionRef = collection(db, 'gastos')
        const queryData = query(expenseCollectionRef, where('uidUser', '==', user.uid), orderBy('date', 'desc'), limit(10))
        onSnapshot(queryData, doc =>{
            if(doc.docs.length > 0){
                setLastExpense(doc.docs[doc.docs.length -1]);
                setThereIsMoreToCharge(true);
            } else {
                setThereIsMoreToCharge(false);
            }
            setExpenses(doc.docs.map((expense) =>{
                return {
                    ...expense.data(), id: expense.id
                }
            }));
        });
        return queryData;
    }, [user])
    return [expenses, getMoreExpenses, thereIsMoreToCharge];
}

export default useExpenses
