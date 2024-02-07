import { CLOSE_MODAL_ACTION_TYPE, OPEN_MODAL_ACTION_TYPE } from '../constants';
import { DISPATCH_TYPES, UI_STATE_INTERFACE } from '../types';

const UIReducer = (state: UI_STATE_INTERFACE, action: DISPATCH_TYPES) => {
  switch (action.type) {
    case OPEN_MODAL_ACTION_TYPE:
      return {
        ...state,
        modal: {
          isOpen: true,
        },
      };
    case CLOSE_MODAL_ACTION_TYPE:
      return {
        ...state,
        modal: {
          isOpen: false,
        },
      };

    default:
      return state;
  }
};

export default UIReducer;
