import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import alertContext from './alterContext';
import alertReducer from './alterReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timout = 3500) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { id, msg, type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timout);
  };
  return (
    <alertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
