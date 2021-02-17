import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthCheck = (Component, option) => {
  const HOC = (props) => {
    const history = useHistory();
    const isLogin = sessionStorage.getItem('access_token');

    useEffect(() => {
      if (!isLogin && option) {
        alert('로그인이 필요한 서비스 입니다.');
        history.replace('/', null);
      }
    }, [history, isLogin]);

    return <Component {...props} />;
  };

  return HOC;
};

export default AuthCheck;
