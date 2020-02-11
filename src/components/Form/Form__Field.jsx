import React from 'react';
import {useStateContext, useActionsContext} from '../Context';

const Form__Field = (props) => {
    console.count('Form__Field');
    const {fieldsProperties, type, name} = props;
    const {currentFormData} = useStateContext();
    const {changeFormTexts, testFormStatus} = useActionsContext();
    
    const changeText = (event) => {
        const text = event.target.value;
        const formName = event.target.name;
        changeFormTexts(text, formName);
    }

    return ( 
              <div>
                <label htmlFor={name}>{name}</label>
                <input {...fieldsProperties} name={name} type={type} 
                        value={currentFormData[name]} 
                        onChange={changeText} 
                        onMouseOut={testFormStatus}/>
              </div>
    )
}

export default Form__Field;
