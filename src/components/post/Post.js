import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Layout from '../../common/Layout';
import CustomTag from '../../common/Tag';
import CustomButton from '../../common/Button';

const Wrapper = styled.div`
  padding: 24px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
`;

const Section = styled.div`
  h1 {
    margin-bottom: 0.25em;
  }

  p {
    margin: 1em 0;
    font-size: 14px;
    word-break: keep-all;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const URL = process.env.REACT_APP_BE_URL;

const Post = () => {
  const { id } = useParams();
  const history = useHistory();

  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get(URL + `/forum/${id}`).then(({ data }) => setPost(data));
  }, []);

  const handleLike = (isLiked) => {
    axios
      .patch(URL + `/forum/${id}`, { isLiked: !isLiked })
      .then(({ data }) => setPost(data));
  };

  const handleDelete = () => {
    window.confirm('정말 삭제하시겠습니까?') &&
      axios
        .delete(URL + `/forum/${id}`)
        .then(() => alert('질문이 삭제되었습니다.'))
        .then(() => history.goBack());
  };

  return (
    <Layout>
      <Wrapper>
        <Section>
          <h1>{post.title}</h1>
          <CustomTag color={post.tag?.color} text={post.tag?.name} />
          <p>{post.content}</p>
          <BtnWrapper>
            <CustomButton
              color={post.isLiked ? '#ff1357' : '#999'}
              text={post.isLiked ? '좋아요 취소' : '좋아요'}
              onClick={() => handleLike(post.isLiked)}
            />
            <CustomButton text="삭제" onClick={handleDelete} />
          </BtnWrapper>
        </Section>
      </Wrapper>
    </Layout>
  );
};

export default Post;
