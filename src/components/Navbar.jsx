import React from 'react'
import { Boton } from './Boton'
import { ContenedorBotones, ContenedorHeader, Header, Titulo } from './Header'
import LogOutButton from './LogOutButton'

const Navbar = () => {
    return (
        <Header>
            <ContenedorHeader>
                <Titulo>Agregar Gasto</Titulo>
            </ContenedorHeader>
            <ContenedorBotones>
                <Boton to='/categories'>Categorias</Boton>
                <Boton to='/list_expenses'>Gastos</Boton>
                <LogOutButton/>
            </ContenedorBotones>
      </Header>
    )
}

export default Navbar
