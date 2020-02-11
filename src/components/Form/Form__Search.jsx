import React from 'react';
import {useActionsContext} from '../Context';

const Form__Search = ( {children} ) => {
    console.count('Form__Search');
    const {searchData} = useActionsContext()
    
    const onSearch = () => {
      event.preventDefault();
      searchData();
    }

    return (
      <form className="form-search" onSubmit={onSearch}>
        {children} 
        <button type="submit" className="form__btn">Найти</button>
      </form>
    ); 
}

export default Form__Search;
