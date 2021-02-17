import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  font-size: 1em;
  font-weight: 400;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  color: #000;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  outline: none;
`;

const Error = styled.span`
  font-size: 12px;
  color: #db2828;
`;

const CustomInput = ({
  type = 'text',
  placeholder,
  error,
  errorMessage,
  name,
  value,
  onChange,
  props,
}) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        />
      </InputWrapper>
      {error && <Error>{errorMessage}</Error>}
    </Wrapper>
  );
};

export default CustomInput;
