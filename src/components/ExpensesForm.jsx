import React, { useState } from 'react'
import { Boton } from './Boton'
import { ContenedorBoton, ContenedorFiltros, Formulario, Input, InputGrande } from './Forms'
import { ReactComponent as IconoPlus } from '../images/plus.svg';
import SelectCategories from '../components/SelectCategories';
import DatePicker from './DatePicker';
import {db} from '../firebase';
import { addDoc, collection } from '@firebase/firestore';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import {useAuth}  from '../context/AuthContext';

const ExpensesForm = () => {
    const {user} = useAuth();
    const [inputs, setInputs] = useState({
        description:'',
        expense:''
    });
    const [pickCategory, setPickCategory] = useState('Hogar');
    const [stateDate, setStateDate] = useState(new Date());
    const {description, expense} = inputs;
    const expenseCollectionRef = collection(db, 'gastos')
    
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
        
        await addDoc(expenseCollectionRef,{
            category: pickCategory,
            date: getUnixTime(stateDate),
            description: description,
            expense: parseFloat(expense),
            uidUser: user.uid
            
        });

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

        </Formulario>
    )
}

export default ExpensesForm
