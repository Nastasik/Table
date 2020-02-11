import React from 'react';
import {useActionsContext, useStateContext} from '../Context';

const TableBody = () => {
    console.count('Table_Body');
    const {displayData} = useStateContext();
    const {showInfo} = useActionsContext();

    return (
        <tbody>
            {displayData.map((item, i) => (
                <tr key={`${item.id+item.lastName}`} onClick={() => showInfo(i)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>  
                </tr>
            ))}
        </tbody>)
}

export default TableBody;
