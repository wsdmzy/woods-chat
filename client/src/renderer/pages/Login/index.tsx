import React from 'react';
import $style from './index.module.less';
import loginLogo from '@renderer/assets/logo.png';

const Login = () => {
  return (
    <div className={$style['login-container']}>
      <img className={$style['login-logo']} src={loginLogo} alt=""/>
      <div className={$style['login-form']}>
        <div className={$style['login-form-item']}>
          <input />
        </div>
        <div className={$style['login-form-item']}>
          <input />
        </div>
        <div className={$style['login-form-item']}>
          <button>登录</button>
          <button>注册</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

