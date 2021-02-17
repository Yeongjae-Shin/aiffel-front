import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CustomInput from '../../common/Input';
import CustomTextArea from '../../common/Textarea';
import CustomButton from '../../common/Button';

const Wrapper = styled.div`
  width: 300px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;

  select {
    appearance: none;
    padding: 1em;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: no-repeat right/8% url('/Arrow-down.svg');
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }
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

const CreatePost = ({ setVisible }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tag: {
      name: 'general',
      color: '#ff1357',
    },
    created_at: new Date(),
  });
  const tagList = [
    {
      name: 'general',
      value: 'general',
    },
    {
      name: 'tip',
      value: 'tip',
    },
    {
      name: 'bug',
      value: 'bug',
    },
    {
      name: 'learn',
      value: 'learn',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFilled =
      Object.values(formData.tag).every((status) => status) &&
      Object.values(formData).every((status) => status);

    if (isFilled) {
      axios
        .post(URL + '/forum', formData)
        .then(() => alert('질문이 등록되었습니다.'))
        .then(() => setVisible(false));
    } else {
      alert('내용을 빠짐없이 입력해주세요.');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = ({ target: { value } }) => {
    setFormData({
      ...formData,
      tag: { ...formData.tag, name: value },
    });
  };

  return (
    <Wrapper>
      <h3>질문 작성하기</h3>
      <br />
      <Container onSubmit={handleSubmit}>
        <Label htmlFor="title">제목</Label>
        <CustomInput
          name="title"
          value={formData.title}
          placeholder="제목을 입력해주세요"
          onChange={handleChange}
        />
        <br />
        <Label htmlFor="content">내용</Label>
        <CustomTextArea
          name="content"
          value={formData.content}
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        />
        <br />
        <Label htmlFor="tag">태그</Label>
        <select name="tag" onChange={handleSelect}>
          {tagList.map((el, i) => {
            return (
              <option key={i} value={el.value}>
                {el.name}
              </option>
            );
          })}
        </select>
        <br />
        <CustomButton text="등록" />
      </Container>
    </Wrapper>
  );
};

export default CreatePost;
