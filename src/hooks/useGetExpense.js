import { doc, getDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';

const useGetExpense = (id) => {
    const [expense, setExpense] = useState('');
    
    const history = useHistory()
    
    useEffect(() => {
        getDoc(doc(db, 'gastos', id)).then((doc) => {
            if (doc.exists){
                setExpense(doc.data())
            }else {
                history.push('/list_expenses')
            }
        })  
    }, [history, id])
    
    return [expense];
}

export default useGetExpense
