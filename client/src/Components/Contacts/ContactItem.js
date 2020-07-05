import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../Context/Contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = e => {
    e.preventDefault();
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-left text-primary'>
        {name}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type === 'professional' ? '工作' : '生活'}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          编辑
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          删除
        </button>
      </p>
    </div>
  );
};

ContactItem.prototypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
