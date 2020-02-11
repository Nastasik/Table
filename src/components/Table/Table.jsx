import React from 'react';
import {useActionsContext} from '../Context';

const Table = ({children}) => {
    console.count('Table');
    const {showNextData, showPrevData} = useActionsContext();

    return ( 
        <div className='table'>
            <table>
                {children}
            </table>
            <div className='table__btns'>
                <button onClick={showPrevData} name='prev'>Назад</button>
                <button onClick={showNextData} name='next'>Вперед</button>
            </div>
        </div>
    )
}

export default Table;
