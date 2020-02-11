import React, { Fragment } from 'react';
import {useServerActionsContext, useServerStateContext} from '../Context';

const ChooseDataPage = () => {
    console.count('ChooseDataPage');
    const {dataType} = useServerStateContext();
    const {updateFetchLink} = useServerActionsContext();

    const handleClick = () => {
        const dataType = event.target.name;
        updateFetchLink(dataType);
    }

    return ( 
        (!dataType &&
        <Fragment>
            <span>Выберите набор данных:</span>
            <div><button name="Маленький" onClick={handleClick}>Маленький</button></div>
            <div><button name="Большой" onClick={handleClick}>Большой</button></div>
        </Fragment>) ||
        (dataType && 
        <Fragment>
            <span>Выбран  <big>{dataType}</big>  набор данных</span>
        </Fragment>)
    )
}

export default ChooseDataPage;
