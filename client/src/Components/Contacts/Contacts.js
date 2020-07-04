import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from './ContactItem';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>目前暂无联系人</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup className='todo-list'>
        {(filtered ? filtered : contacts).map(contact => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact}></ContactItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
