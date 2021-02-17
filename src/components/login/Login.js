import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import CustomInput from '../../common/Input';
import CustomButton from '../../common/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #000;
  font-size: 12px;
  font-weight: bold;

  &::after {
    margin: -0.2em 0 0 0.2em;
    content: '*';
    color: #db2828;
    vertical-align: top;
  }
`;

const URL = process.env.REACT_APP_BE_URL;

const Login = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateAction = ({ email, password }) => ({
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/.test(email),
    password: password.length >= 10,
  });

  const validation = validateAction(formData);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const isPass = Object.values(validation).every((status) => status);

      if (!isPass) {
        alert('아이디나 비밀번호를 확인해주세요.');
      } else {
        axios
          .get(URL + '/login', {
            email: formData.email,
            password: formData.password,
          })
          .then(({ data }) => {
            sessionStorage.setItem('access_token', 'this_is_access_token');
            sessionStorage.setItem(
              'username',
              data.map(({ username }) => username),
            );
          })
          .then(() => history.push('/forum'));
      }
    },
    [validation, formData, history],
  );

  const handleLogin = useCallback(
    ({ target: { name, value } }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <br />
        <Label htmlFor="id">아이디</Label>
        <CustomInput
          autoComplete="off"
          placeholder="example@aiffel.com"
          name="email"
          value={formData.email}
          onChange={handleLogin}
          error={!!formData.email && !validation.email}
          errorMessage="올바른 이메일 형식이 아닙니다."
        />
        <br />
        <Label htmlFor="pw">비밀번호</Label>
        <CustomInput
          autoComplete="off"
          type="password"
          placeholder="**********"
          name="password"
          value={formData.password}
          onChange={handleLogin}
          error={!!formData.password && !validation.password}
          errorMessage="비밀번호는 10자리 이상입니다."
        />
        <br />
        <CustomButton text="로그인" type="submit" />
      </Form>
    </Wrapper>
  );
};

export default Login;
