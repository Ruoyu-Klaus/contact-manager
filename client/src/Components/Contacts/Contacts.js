import React, { useContext, useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem';

import Spinner from '../Layout/Spinner';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, getContact, loading, filtered } = contactContext;

  useEffect(() => {
    getContact();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4>目前暂无联系人</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup className='todo-list'>
          {(filtered ? filtered : contacts).map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact}></ContactItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
