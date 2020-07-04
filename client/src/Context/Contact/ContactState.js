import React, { useReducer } from 'react';
import uuid from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        type: 'personal',
        id: 1,
        name: 'Harry',
        phone: 1234566789,
        email: 'harryon@gmail.com',
      },
      {
        type: 'personal',
        id: 2,
        name: 'Jason',
        email: 'jason@gmail.com',
      },
      {
        type: 'professional',
        id: 3,
        name: 'Aidan',
        email: 'aidan@gmail.com',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //ADD CONTACT

  //SET CURRENT CONTACT

  //CLEAR CURRENT CONTACT

  //UPDATE CONTACT

  //DELETE CONTACT

  //FILTER CONTACTS

  //CLEAR FILTER

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
