import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import BtnRegresar from '../components/BtnRegresar'
import ExpensesForm from '../components/ExpensesForm'
import { ContenedorHeader, Titulo } from '../components/Header'
import TotalExpenses from '../components/TotalExpenses'
import useGetExpense from '../hooks/useGetExpense'

const EditExpense = () => {
    const {id} = useParams();
    const editExpense = useGetExpense(id);
    
    return (
        <>
            <Helmet>
                <title>Editar gasto</title>
            </Helmet>
            <ContenedorHeader>
                <BtnRegresar/>
                <Titulo>Editar gasto</Titulo>
            </ContenedorHeader>
            <ExpensesForm editExpense={editExpense}/>
            <TotalExpenses/>
        </>
    )
}

export default EditExpense
