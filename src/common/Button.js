import React from 'react';
import styled from 'styled-components';

const CustomBtn = styled.button`
  min-width: 60px;
  padding: 0.875em;
  margin: 0 3px;
  background-color: ${(props) => (props.color ? props.color : '#ffbc12')};
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:hover {
    filter: brightness(97%);
    transition: filter 0.3s ease-out;
  }
`;

const CustomButton = (props) => {
  return <CustomBtn {...props}>{props.text}</CustomBtn>;
};

export default CustomButton;
