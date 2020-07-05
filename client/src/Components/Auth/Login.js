import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/Alert/alterContext';
import AuthContext from '../../Context/Auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { loginUser, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invaild Credentials for Email') {
      setAlert('该邮箱不存在', 'danger');
      clearError();
    }
    if (error === 'Invalid Credentials for Password') {
      setAlert('密码错误', 'danger');
      clearError();
    }
    //eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!email) {
      setAlert('请输入邮箱', 'danger');
    } else if (!password) {
      setAlert('请输入密码', 'danger');
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        用户<span className='text-primary'>登陆</span>
      </h1>
      <form onSubmit={onSubmit}>
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
          />
        </div>
        <input
          type='submit'
          value='登陆'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
