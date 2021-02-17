import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  padding: 5px;
  font-size: 10px;
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: 3px;
  color: #fff;
`;

const CustomTag = ({ color, text }) => {
  return <Tag color={color}>{text}</Tag>;
};

export default CustomTag;
