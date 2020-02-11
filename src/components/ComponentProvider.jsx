import React, {useMemo, useReducer, useEffect} from 'react';
import {ActionsContext, StateContext} from './Context';
import {useServerStateContext} from './Context';

const ComponentProvider = (props) => {
  console.count('ComponentProvider');
  const {serverData} = useServerStateContext();

  const reducer = (state, action) => {
    switch (action.type) {

      case 'CHANGE_SHOW_INFO':
        return {
          ...state,
          info: state.displayData[action.payload],
      }
    
      case 'CHANGE_DISPLAY_DATA':
        const {sort} = state;
        const needDisplay = sort.data ? sort.data : (state.searchData ? state.searchData : state.initial);
        return {
          ...state,
          displayData: needDisplay.slice(state.offset, state.offset + 50),
      }

      case 'SHOW_NEXT_DATA':
        const changeNextData = (state.searchData ? state.searchData : state.initial);
        return {
          ...state,
          offset: ((state.offset + 50) < changeNextData.length) ? state.offset + 50 : state.offset,
      }

      case 'SHOW_PREV_DATA':
        return {
          ...state,
          offset: ((state.offset - 50) >= 0) ? state.offset - 50 : state.offset,
      }

      case 'CHANGE_SORT_DATA':
        const nextField = action.payload;
        const {field, data} = state.sort;
        const sortData = state.searchData ? state.searchData : state.initial;
        return {
          ...state,
          sort: {
            field: nextField,
            data: (nextField !== field) ? 
                      sortData.sort((a, b) => {
                          if (nextField === ('id' || 'phone')) {
                              return a[nextField] - b[nextField]
                          } else {
                              return (a[nextField].toLowerCase() < b[nextField].toLowerCase() ? -1 : 1);
                          }}) 
                      : data.reverse()
                }     
              }

      case 'SEARCH_DATA':
        const {initial} = state;
        const {search} = state.currentFormData;
        const searchLow = search.toLowerCase();
     
        return {
          ...state,
          sort: {
            ...sort,
            data: null,
          },
          offset: 0,
          searchData: initial.filter((row) => {
            const string = (row.id + row.firstName + row.lastName + row.email + row.phone).toLowerCase();
            return (string.indexOf(searchLow) != -1) ? row : null;
          }),
      }
   
      case 'CHANGE_FORM_TEXTS':
        const { text, formName } = action.payload;
        const { currentFormData } = state;
        return {
          ...state,
          currentFormData: {
            ...currentFormData, 
            [formName]: text,
          },
      }

      case 'TEST_FORM_STATUS':
        const {ID, lastName, firstName, email, phone} = state.currentFormData;
        const formStatus = false + !ID + !lastName + !firstName + !email + !phone;
        const canAdd = formStatus === 0 ? 'yes' : 'no';
        return {
          ...state,
          canAdd: canAdd,
        }
      
      case 'ADD_FORM_DATA':
        return {
          ...state,
          initial: state.canAdd === 'yes' ? [state.currentFormData, ...state.displayData] : state.displayData,
          displayData: state.canAdd === 'yes' ? [state.currentFormData, ...state.displayData].slice(state.offset, state.offset + 50) : state.displayData,
        }
        
      default:
        return new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, { initial: serverData,
                                                  searchData: null,
                                                  sort: {
                                                          field: null,
                                                          data: null,
                                                        },
                                                  displayData: serverData.slice(0, 50),
                                                  offset: 0,
                                                  
                                                  loading: false,
                                                  error: false,
                                                  currentFormData: {
                                                                      ID: '',
                                                                      firstName: '',
                                                                      lastName: '',
                                                                      email: '',
                                                                      phone: '',
                                                                      search: '',
                                                                    },
                                                  canAdd: 'no',
                                                  sentFormData: null,
                                                  info: null,
                                                })

  useEffect(() => {
    if(state.searchData || state.sort.data || state.initial) {
      dispatch({type:'CHANGE_DISPLAY_DATA'});
    }
  }, [serverData, state.searchData, state.sort, state.offset])




  const showInfo = (i) => {
    dispatch({type: 'CHANGE_SHOW_INFO', payload: i});
  }

  const testFormStatus = () => {
    dispatch({type: 'TEST_FORM_STATUS'});
  }

  const addFormData = () => {
    dispatch({type: 'ADD_FORM_DATA'});
  }

  const changeFormTexts = (text, formName) => {
    dispatch({type: 'CHANGE_FORM_TEXTS', payload: {text, formName}});
  }

  const searchData = () => {
    dispatch({type:'SEARCH_DATA'});
  }

  const sortData = (field) => {
    dispatch({type: 'CHANGE_SORT_DATA', payload: field});
  }


  const showNextData = () => {
    dispatch({type:'SHOW_NEXT_DATA'});
  }

  const showPrevData = () => {
    dispatch({type: 'SHOW_PREV_DATA'});
  }
 
  const actions = useMemo(() => ({
    changeFormTexts,
    addFormData,
    testFormStatus,
    searchData,
    sortData,
    showInfo,
    showNextData,
    showPrevData,
  }), [])

  return (
    <StateContext.Provider value={state}>    
        <ActionsContext.Provider value={actions}>
            {props.children}
        </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export default ComponentProvider;