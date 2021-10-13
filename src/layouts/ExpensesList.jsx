import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import BtnRegresar from '../components/BtnRegresar'
import { ContenedorHeader, Titulo } from '../components/Header'
import { BotonAccion, BotonCargarMas, Categoria, ContenedorBotonCentral, ContenedorBotones, ContenedorSubtitulo, Descripcion, ElementoLista, Fecha, Lista, Subtitulo, Valor } from '../components/ListElements'
import formatQuantity from '../functions/changeMoney'
import useExpenses from '../hooks/useExpenses'
import {ReactComponent as EditIcon} from '../images/editar.svg';
import {ReactComponent as DeleteIcon} from '../images/borrar.svg';
import { Boton } from '../components/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import { db } from '../firebase';
import {doc, deleteDoc} from 'firebase/firestore'

const ExpensesList = () => {
    const [expenses, getMoreExpenses, thereIsMoreToCharge] = useExpenses();
    const formatDate = (date) => {
        return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy", {locale: es});
    }
    const groupsExpensesByDate = (expenses, index, expense) => {
        if(index !== 0){
            const  actualDate = formatDate(expense.date)
            const previewDate = formatDate(expenses[index-1].date)
            if (actualDate === previewDate) {
                return true;
            } else {
                return false;
            }
        }
    }
    const deleteExpense = (id) => {
        // const expenseCollectionRef = collection(db, 'gastos', id)
        deleteDoc(doc(db, 'gastos', id))
    }
    return (
        <>
        <Helmet>
            <title>Lista de gastos</title>
        </Helmet>

        <ContenedorHeader>
                <BtnRegresar/>
                <Titulo>Lista de gastos</Titulo>
        </ContenedorHeader>
        <Lista>
            {expenses.map((expense, index) => {
                return(
                    <div key={expense.id}>
                        {!groupsExpensesByDate(expenses, index, expense) && <Fecha>{formatDate(expense.date)}</Fecha>}
                        <ElementoLista key={expense.id}>
                        <Categoria>
                            {expense.category}
                            </Categoria>
                            <Descripcion>
                                {expense.description}
                            </Descripcion>
                            <Valor>{formatQuantity(expense.expense)}</Valor>
                            <ContenedorBotones>
                                <BotonAccion as={Link} to={`/edit_expenses/${expense.id}`}><EditIcon/></BotonAccion>
                                <BotonAccion onClick={() => deleteExpense(expense.id)}><DeleteIcon/></BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                    </div>
                );
            })}
            {thereIsMoreToCharge && (
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={()=> getMoreExpenses()}>Cargar Mas</BotonCargarMas>
                </ContenedorBotonCentral>
            )}
            {expenses.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo>No hay mas gastos para mostrar</Subtitulo>
                    <Boton as={Link} to='/'>Agregar Gasto</Boton>
                </ContenedorSubtitulo>
            }
        </Lista>
        </>
    )
}

export default ExpensesList;
