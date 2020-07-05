import React, { Fragment, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/Auth/authContext';
import ContactContext from '../../Context/Contact/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logoutUser, user } = authContext;
  const { clearContact } = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContact();
  };

  const authLinks = (
    <Fragment>
      <li>你好 {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>登出</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>首页</Link>
        <Link to='/about'>关于</Link>
        <Link to='/register'>注册</Link>
        <Link to='/login'>登陆</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        <Link to='/'>{title}</Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};
Navbar.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string,
};
Navbar.defaultProps = {
  title: ' 联系',
  icon: 'fas fa-id-card-alt',
};
export default Navbar;
