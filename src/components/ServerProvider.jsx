import React, {useState} from 'react';
import {ServerContext} from './Context';

const ServerProvider = (props) => {
  console.count('ServerProvider');
 
  const [dataType, setDataType] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(false);

 const updateFetchLink = (newDataType) => { 
    if (dataType !== newDataType) {
        let url;
        if (newDataType === "Маленький") {
            url = "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
        } 
        if(newDataType === "Большой") {
            url = "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
        }
        fetchData(url);
        setDataType(newDataType);
    }
  }

  const fetchData = async (url) => {
    setDataLoading(true);
  
      try {
          const response = await fetch(url);   
          if (!response.ok) throw new Error(response.statusText);           
          const data = await response.json();    
    
          setServerData(data);
          setDataError(false);

      } catch (error) {
          setDataError(false);
      } finally {
            setDataLoading(false);
      }
  }

  const initial = {
    serverData: serverData,
    dataLoading: dataLoading,
    dataError: dataError,
    dataType: dataType,
  }

  const actions = {updateFetchLink}

  return (
    <ServerContext.Provider value={{initial, actions}}>    
            {props.children}
    </ServerContext.Provider>
  )
}

export default ServerProvider;