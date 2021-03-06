import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../Context/Contact/contactContext';
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <div>
      <input ref={text} type='text' placeholder='搜索...' onChange={onChange} />
    </div>
  );
};

export default ContactFilter;
