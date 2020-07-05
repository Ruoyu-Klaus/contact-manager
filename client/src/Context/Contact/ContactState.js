import React, { useReducer } from 'react';
import axios from 'axios';
// import { v4 as uuid } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //GET CONTACT
  const getContact = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  //ADD CONTACT
  const addContact = async contact => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
      const res = await axios.post('/api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  //SET CURRENT CONTACT
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT, payload: null });
  };
  //DELETE CONTACT
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  //UPDATE CONTACT
  const updateContact = async contact => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  //CLEAR CONTACTS
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  //FILTER CONTACTS
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContact,
        addContact,
        updateContact,
        clearContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
