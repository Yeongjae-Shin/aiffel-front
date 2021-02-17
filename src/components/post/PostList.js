import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import CustomButton from '../../common/Button';
import Modal from '../../common/Modal';
import CreatePost from './CreatePost';
import CustomTag from '../../common/Tag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0 0.5em;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.825em;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  cursor: pointer;

  &:hover {
    filter: brightness(97%);
    transition: filter 0.3s ease-out;
  }

  &::last-child {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.p`
  display: -webkit-box;
  padding: 10px 0;
  margin-bottom: 10px;
  height: 45px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  white-space: normal;
  line-height: 1.5;
  word-break: keep-all;
  text-align: left;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`;

const PostList = ({ data, visible, setVisible }) => {
  const history = useHistory();

  const goToDetailPage = (id) => {
    history.push(`/forum/${id}`);
  };

  const getRegisterTime = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const seconds = new Date(date).getSeconds();

    const result = `${year}년 ${month}월 ${day}일 ${
      hour < 10 ? `0${hour}` : hour
    }:${minute < 10 ? `0${minute}` : minute}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;

    return result;
  };

  return (
    <Wrapper>
      <Title>
        <h1>질문 목록</h1>
        <CustomButton text="질문작성" onClick={() => setVisible(true)} />
      </Title>
      <br />
      {data.map(
        ({ id, title, content, tag: { name, color }, created_at = '' }) => {
          return (
            <PostWrapper key={id} onClick={() => goToDetailPage(id)}>
              <h3>{title}</h3>
              <ContentWrapper>{content}</ContentWrapper>
              <TagWrapper>
                <CustomTag color={color} text={name} />
                {created_at && (
                  <CreatedAt>{getRegisterTime(created_at)}</CreatedAt>
                )}
              </TagWrapper>
            </PostWrapper>
          );
        },
      )}
      {visible && (
        <Modal visible={visible} setVisible={setVisible}>
          <CreatePost setVisible={setVisible} />
        </Modal>
      )}
    </Wrapper>
  );
};

export default PostList;
