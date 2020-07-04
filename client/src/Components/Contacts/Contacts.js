import React, { useContext, useEffect, Fragment } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Have no contacts at moment</h4>;
  }

  return (
    <Fragment>
      {(filtered ? filtered : contacts).map(contact => (
        <ContactItem key={contact.id} contact={contact}></ContactItem>
      ))}
    </Fragment>
  );
};

export default Contacts;
