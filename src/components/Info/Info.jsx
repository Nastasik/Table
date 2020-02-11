import React from 'react';
import {useStateContext} from '../Context';

const Info = () => {
    console.count('Info');
    const {info} = useStateContext();

    return ( 
        info &&
        <div>
            <div>Выбран пользователь {info.firstName} {info.lastName}</div>
            <div>Описание: {info.description}</div>
            <div>Адрес проживания: {info.address.streetAddress}</div> 
            <div>Город: {info.address.city}</div>
            <div>Провинция/штат: {info.address.state}</div>
            <div>Индекс: {info.address.zip}</div>
        </div>) 
}

export default Info;
