import React from 'react'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../components/BtnRegresar'
import { ContenedorHeader, Titulo } from '../components/Header'
import useExpenses from '../hooks/useExpenses'

const ExpensesList = () => {
    const expenses = useExpenses()
    console.log(expenses)
    return (
        <>
        <Helmet>
            <title>Lista de gastos</title>
        </Helmet>
        <ContenedorHeader>
                <BtnRegresar/>
                <Titulo>Lista de gastos</Titulo>
            </ContenedorHeader>
        </>
    )
}

export default ExpensesList
