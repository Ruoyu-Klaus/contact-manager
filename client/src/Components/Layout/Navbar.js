import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        <Link to='/'>{title}</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>首页</Link>
          <Link to='/about'>关于</Link>
          <Link to='/register'>注册</Link>
          <Link to='/login'>登陆</Link>
        </li>
      </ul>
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
