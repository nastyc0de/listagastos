import React from 'react'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../components/BtnRegresar'
import { ContenedorHeader, Titulo } from '../components/Header'

const ExpensesList = () => {
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
