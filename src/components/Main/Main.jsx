import React, { Fragment } from 'react';
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import {useServerStateContext} from '../Context';
import Form from '../Form/Form';
import Form__Field from '../Form/Form__Field';
import Table from '../Table/Table'
import Info from '../Info/Info'
import TableHeader from '../Table/TableHeader'
import TableBody from '../Table/TableBody'
import Form__Search from '../Form/Form__Search'
import ComponentProvider from '../ComponentProvider';

const Main = () => {
    console.count('Main');
    const {serverData, dataLoading, dataError} = useServerStateContext();

    const fieldsProperties = {
        required: true,
        className: "form__title", 
        placeholder: "",
      }
  
      const fieldsHeaders = [{
        type: 'number',
        name: 'ID'
      }, {
        type: 'text',
        name: 'firstName'
      }, {
        type: 'text',
        name: 'lastName'
      }, {
        type: 'email',
        name: 'email'
      }, {
        type: 'phone',
        name: 'phone'
      }]

    return ( 
        <div className="content-container">
            {dataLoading && <Loader/>}
            {dataError && <Error/>}
            {(serverData) && 
              <Fragment>
                <ComponentProvider>
                  <Form__Search>
                    <Form__Field {...fieldsProperties} type='text' name='search' key='search233'/>
                  </Form__Search>
                  <Info/>
                  <Table>
                    <TableHeader/>
                    <TableBody/>
                  </Table>
                  <Form>
                    {fieldsHeaders.map((el, i) => <Form__Field {...fieldsProperties} type={el.type} name={el.name} key={`${el.name + i}`}/>)} 
                  </Form>
                </ComponentProvider>
              </Fragment>
            }
        </div>
    )
}

export default Main;
