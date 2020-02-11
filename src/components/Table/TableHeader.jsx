import React, {useState} from 'react';
import {useActionsContext} from '../Context';

const TableHeader = () => {
    console.count('TableHeader');
    const [order, setOrder] = useState({});
    const {sortData} = useActionsContext();

    const onSort = () => {
        const field = event.target.innerText;
        sortData(field);
        ((order[field] === "возр") ? setOrder({[field]: "убыв"}) : setOrder({[field]: "возр"}));
    }
    return ( 
            <thead>
                <tr>
                    {['id', 'firstName', 'lastName', 'email', 'phone'].map((field, index) =>
                        <td key={index}>
                           <span onClick={onSort}>{field}</span> {order[field] && <small>{order[field]}</small>}
                        </td>
                    )}
                </tr>
            </thead>
    )
}

export default TableHeader;
