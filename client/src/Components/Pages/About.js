import React from 'react';

const About = () => {
  return (
    <div>
      <h1>关于本站</h1>
      <p className='my-1'>
        本站是基于React,Express,MongoDB构建的练手项目，不可用于生产
      </p>
      <p className='bg-dark p'>
        <strong>版本:</strong>1.0.0
      </p>
      <p className='bg-dark p'>
        <strong>作者:</strong>若宇
      </p>
    </div>
  );
};

export default About;
