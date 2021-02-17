import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

const TextareaWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  font-size: 1em;
  font-weight: 400;
  color: #000;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1em;
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  outline: none;
  resize: vertical;
`;

const CustomTextArea = ({ placeholder, name, value, onChange, props }) => {
  return (
    <Wrapper>
      <TextareaWrapper>
        <Textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        />
      </TextareaWrapper>
    </Wrapper>
  );
};

export default CustomTextArea;
