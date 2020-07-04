import React, { useContext, Fragment } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact}></ContactItem>
      ))}
    </Fragment>
  );
};

export default Contacts;
