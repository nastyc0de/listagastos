import React from 'react'
import { Helmet } from 'react-helmet';
import BtnRegresar from '../components/BtnRegresar';
import {ContenedorHeader, Titulo} from '../components/Header'

const ExpensesByCategory = () => {
    return (
        <>
        <Helmet>
            <title>Gastos por categoria</title>
        </Helmet>
        <ContenedorHeader>
                <BtnRegresar route='/list_expenses'/>
                <Titulo>Gastos por categoria</Titulo>
            </ContenedorHeader>
        </>
    )
}

export default ExpensesByCategory
