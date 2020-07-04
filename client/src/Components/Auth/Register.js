import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/Alert/alterContext';
import AuthContext from '../../Context/Auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'The email has already existed') {
      setAlert('该用户已存在', 'danger');
      clearError();
    }
    //eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    switch (true) {
      case !name:
        return setAlert('请输入姓名', 'danger');
      case !email:
        return setAlert('请输入邮箱', 'danger');
      case !password:
        return setAlert('请输入密码', 'danger');
      case password !== password2:
        return setAlert('两次密码不相同', 'danger');
      default:
        return register({ name, email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        用户<span className='text-primary'>注册</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>姓名</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>邮箱</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>密码</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>确认密码</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='注册'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
