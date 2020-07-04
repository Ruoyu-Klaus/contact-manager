import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Login submit' + user);
  };

  const { email, password } = user;
  return (
    <div className='form-container'>
      <h1>
        用户<span className='text-primary'>登陆</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>邮箱</label>
          <input type='email' name='emial' value={email} onChange={onChange} />
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
