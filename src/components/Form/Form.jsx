import React, { Fragment, useState } from 'react';
import {useActionsContext, useStateContext} from '../Context';

const Form = ( {children} ) => {
    console.count('Form');
    const {addFormData} = useActionsContext();
    const {canAdd} = useStateContext();
    const [isOpen, setIsOpen] = useState(false);

    const onSend = () => {
      event.preventDefault();
      addFormData();
    }

    const handleClick = () => {
      isOpen === false ? setIsOpen(true) : setIsOpen(false);
    }

    const submitBtnStyle = canAdd === 'yes' ? 'form__btn form__btn_active' : 'form__btn';

    return (
      <form className='form' onSubmit={onSend}>
        <button type='button' className='form__btn' onClick={handleClick}>Добавить новую строку в таблицу</button>
        {isOpen === true && <Fragment>
                              <div className='form__container'>
                                  {children} 
                              </div>
                              <button type='submit' className={submitBtnStyle}>Добавить в таблицу</button>
                            </Fragment>}
      </form>
    ); 
}

export default Form;
