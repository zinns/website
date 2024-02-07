import { Dispatch, createContext, useReducer } from 'react';
import UIReducer from 'context/ui/reducer';
import {
  DISPATCH_TYPES,
  UI_CONTEXT_INTERFACE,
  UI_CONTEXT_REACT_INTERFACE,
  UI_STATE_INTERFACE,
} from './types';

export const initUIState: UI_STATE_INTERFACE = {
  modal: {
    isOpen: false,
  },
};

export const UIContext = createContext({} as UI_CONTEXT_INTERFACE);

export const UIProvider: React.FC<UI_CONTEXT_REACT_INTERFACE> = ({ children }) => {
  const [state, dispatch]: [UI_STATE_INTERFACE, Dispatch<DISPATCH_TYPES>] = useReducer(
    UIReducer,
    initUIState,
  );
  return <UIContext.Provider value={{ ...state, dispatch }}>{children}</UIContext.Provider>;
};
