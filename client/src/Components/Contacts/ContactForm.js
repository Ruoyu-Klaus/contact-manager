import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../Context/Contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;
  // Use State to deal with form
  const defaultState = { name: '', email: '', phone: '', type: 'personal' };
  const [contact, setContact] = useState(defaultState);

  useEffect(() => {
    if (current !== null) {
      setContact(Object.assign(defaultState, current));
    } else {
      setContact(defaultState);
    }
    //eslint-disable-next-line
  }, [contactContext, current]);
  // monitor changes based on the name attribute of the inputs
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      // @param: Current state of contact
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact(defaultState);
  };

  const clearAll = () => {
    clearCurrent();
  };

  const { name, email, phone, type } = contact;
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? '编辑联系人' : '添加新联系人'}
      </h2>
      <input
        type='text'
        placeholder='姓名'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='邮箱'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='电话'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>联系人类别</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      生活{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      工作
      <div>
        <input
          type='submit'
          value={current ? '更新联系人' : '添加联系人'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            返回
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
