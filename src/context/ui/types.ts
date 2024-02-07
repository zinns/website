import { Dispatch } from 'react';

export interface UI_CONTEXT_REACT_INTERFACE {
  children: JSX.Element | JSX.Element[];
}

export interface UI_CONTEXT_INTERFACE {
  modal: {
    isOpen: boolean;
  };
  dispatch: Dispatch<DISPATCH_TYPES>;
}

export type DISPATCH_TYPES = TOGGLE_MODAL_ACTION_INTERFACE;

export interface UI_CONTEXT_ACTION {
  type: string;
  payload: unknown;
}

export interface UI_STATE_INTERFACE {
  modal: {
    isOpen: boolean;
  };
}

export type TOGGLE_MODAL_ACTION_INTERFACE = {
  type: OPEN_MODAL_ACTION_TYPE | CLOSE_MODAL_ACTION_TYPE;
};

export type OPEN_MODAL_ACTION_TYPE = 'OPEN_MODAL';
export type CLOSE_MODAL_ACTION_TYPE = 'CLOSE_MODAL';
