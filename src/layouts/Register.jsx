import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Alerts from '../components/Alerts';
import { Boton } from '../components/Boton';
import {createUser} from '../firebase';
import { ContenedorBoton, Formulario, Input } from '../components/Forms';
import { ContenedorHeader, Header, Titulo } from '../components/Header';
import { ReactComponent as SvgRegister } from '../images/registro.svg';


const Svg = styled(SvgRegister)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;
const Register = () => {
    const [alertState, setAlertState] = useState(false);
    const [alert, setAlert] = useState({ type:'', msg:''})
    const [values, setValues] = useState({
        email:'',
        password:'',
        password2:''
    })
    const history = useHistory()
    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const{email, password, password2} = values;
        const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!regex.test(email)){
            setAlertState(true);
            setAlert({
                type:'error',
                msg:'Ingresa un correo valido' 
            })
            return;
        }
        if(email === '' || password === '' || password2 === ''){
            setAlertState(true)
            setAlert({
                type:'error',
                msg:'Rellena los campos'
            })
            return;
        }
        if(password !== password2){
            setAlertState(true)
            setAlert({
                type:'error',
                msg:'Los password no coinciden'
            })
        }
        try {
            await createUser(email, password)
            setAlertState(true)
            setAlert({
                type:'exito',
                msg:'El usuario se creo con exito'
            })
            history.push('/');
        }
        catch(error){
            setAlertState(true)
                    
            let msg;
            switch(error.code){
				case 'auth/invalid-password':
					msg = 'La contraseña tiene que ser de al menos 6 caracteres.' 
					break;
				case 'auth/email-already-in-use':
					msg = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				    break;
				case 'auth/invalid-email':
					msg = 'El correo electrónico no es válido.'
				    break;
                case 'auth/weak-password':
                    msg = 'La contraseña debe de ser de al menos 6 caracteres.' 
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/login'>Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input
                    type='email'
                    name='email'
                    placeholder='Correo Electronico'
                    value={values.email}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password2'
                    placeholder='Repite tu password'
                    value={values.password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'>Crear Cuenta</Boton>
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

export default Register
