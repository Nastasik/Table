import { createContext, useContext } from 'react';

export const StateContext = createContext();
export const ActionsContext = createContext();
export const ServerContext = createContext();

export const useServerStateContext = () => {
  return useContext(ServerContext).initial
}

export const useServerActionsContext = () => {
  return useContext(ServerContext).actions
}

export const useStateContext = () => {
  return useContext(StateContext)
}
 
export const useActionsContext = () => {
  return useContext(ActionsContext)
}

