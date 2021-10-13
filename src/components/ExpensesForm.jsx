import React, { useEffect, useState } from 'react'
import { Boton } from './Boton'
import { ContenedorBoton, ContenedorFiltros, Formulario, Input, InputGrande } from './Forms'
import { ReactComponent as IconoPlus } from '../images/plus.svg';
import SelectCategories from '../components/SelectCategories';
import DatePicker from './DatePicker';
import {db} from '../firebase';
import { addDoc, collection } from '@firebase/firestore';
// import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import {useAuth}  from '../context/AuthContext';
import Alerts from './Alerts';

const ExpensesForm = ({editExpense}) => {
    const {user} = useAuth();
    const [inputs, setInputs] = useState({
        description:'',
        expense:''
    });
    const [pickCategory, setPickCategory] = useState('Hogar');
    const [stateDate, setStateDate] = useState(new Date());
    const [alertState, setAlertState] = useState(false);
    const [alert, setAlert] = useState({});
    const {description, expense} = inputs;
    const expenseCollectionRef = collection(db, 'gastos')
    
    useEffect(() => {
        if(editExpense){
            if(editExpense.uidUser === user.uid){

            }else{

            }
        }
    }, [editExpense, user])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === expense) {
            value.replace(/[^0-9.]/g, ' ');
        }
        setInputs({
            ...inputs,
            [name]:value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (description !== '' && expense !== '') {
            if(expense){
                await addDoc(expenseCollectionRef,{
                    category: pickCategory,
                    date: getUnixTime(stateDate),
                    description: description,
                    expense: parseFloat(expense),
                    uidUser: user.uid    
                });
                setInputs({
                    description:'',
                    expense:''
                })
                setPickCategory('Hogar');
                setStateDate(new Date());
                setAlertState(true);
                setAlert({type:'exito', msg:'El gasto se agrego correctamente'})


            } else {
                setAlertState(true);
                setAlert({type:'error', msg:'El valor que ingresaste no es correcto'})
            }
            
        } else {
            setAlertState(true);
            setAlert({type:'error', msg:'Agrega los campos faltantes'});
            
        }

    }
    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategories
                    pickCategory={pickCategory}
                    setPickCategory={setPickCategory}
                />
                <DatePicker
                    stateDate={stateDate}
                    setStateDate={setStateDate}
                />
            </ContenedorFiltros>
            <div>
                <Input
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Descripcion'
                    value={description}
                    onChange={handleChange}
                />
                <InputGrande
                    type='number'
                    name='expense'
                    id='expense'
                    placeholder='$0.00'
                    value={expense}
                    onChange={handleChange}

                />                
            </div>
            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'>
                    Agregar Gasto <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerts
                type={alert.type}
                msg={alert.msg}
                alertState={alertState}
                changeAlertState={setAlertState}
            />
        </Formulario>
    )
}

export default ExpensesForm
