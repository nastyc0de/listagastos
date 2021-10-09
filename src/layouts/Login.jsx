import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Alerts from '../components/Alerts'
import { Boton } from '../components/Boton'
import { ContenedorBoton, Formulario, Input } from '../components/Forms'
import { ContenedorHeader, Header, Titulo } from '../components/Header'
import { signInUser } from '../firebase'
import {ReactComponent as SvgLogin} from '../images/login.svg';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;
const Login = () => {
    const [alertState, setAlertState] = useState(false);
    const [alert, setAlert] = useState({ type:'', msg:''})
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const {email, password} = values;
    const history = useHistory()
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const{email, password} = values;
        const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!regex.test(email)){
            setAlertState(true);
            setAlert({
                type:'error',
                msg:'Ingresa un correo valido' 
            })
            return;
        }
        if(email === '' || password === ''){
            setAlertState(true)
            setAlert({
                type:'error',
                msg:'Rellena los campos vacios'
            })
            return;
        }
        try {
            await signInUser(email, password)
            history.push('/');
        }
        catch(error){
            setAlertState(true)
                    
            let msg;
            switch(error.code){
				case 'auth/wrong-password':
					msg = 'La contraseña no es correcta.' 
					break;
				case 'auth/user-not-found':
					msg = 'La cuenta no existe.'
				    break;
				default:
					msg = 'Hubo un error al intentar crear la cuenta.'
				    break;
			}
            setAlert({
                type:'error',
                msg:msg
            })
        }
    }
   
    return (
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to='/register'>Crear Cuenta</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Correo Electronico'
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'>Iniciar</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerts
                type={alert.type}
                msg={alert.msg}
                alertState={alertState}
                changeAlertState={setAlertState}
            />
        </>
    )
}

export default Login
