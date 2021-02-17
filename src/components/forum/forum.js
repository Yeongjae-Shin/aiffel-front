import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Layout from '../../common/Layout';
import CustomInput from '../../common/Input';
import CustomButton from '../../common/Button';
import PostList from '../post/PostList';
import Pagination from '../pagination/Pagination';
import Loader from '../../common/Loading';

const Form = styled.form`
  display: flex;

  input {
    margin-right: 10px;
  }
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

const URL = process.env.REACT_APP_BE_URL;

const Forum = () => {
  const isLogin = sessionStorage.getItem('access_token');

  const [value, setValue] = useState('');
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    axios
      .get(URL + `/forum?_page=${page}&_limit=5&_sort=created_at&_order=DESC`)
      .then(({ headers, data }) => {
        setLoading(false);
        // sort로 정렬 시 각 페이지 별로 시간 순으로 정렬
        // setPostList(
        //   data.sort((a, b) => {
        //     return a.created_at < b.created_at
        //       ? 1
        //       : a.created_at > b.created_at
        //       ? -1
        //       : 0;
        //   }),
        // );
        setPostList(data);
        setTotalPage(Math.ceil(headers['x-total-count'] / 5));
      });
  }, [page]);

  useEffect(() => {
    isLogin && getData();
  }, [isLogin, getData, visible]);

  const handleSearchValue = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!value) {
      alert('검색하고 싶은 단어를 입력해주세요');
    } else {
      setLoading(true);
      axios
        .get(URL + '/forum?&_sort=created_at&_order=DESC')
        .then(({ data }) => {
          setLoading(false);
          setPostList(
            data.filter(({ content }) => {
              return content.includes(value);
            }),
          );
        });
      setValue('');
      setTotalPage(Math.ceil(postList.length / 5));
    }
  };

  const initialization = (e) => {
    e.preventDefault();
    getData();
  };

  if (!isLogin) return null;

  return (
    <Layout>
      <Form>
        <CustomInput
          value={value}
          onChange={handleSearchValue}
          placeholder="검색어를 입력해보세요"
        />
        <CustomButton text="검색" onClick={handleSearch} />
        <CustomButton text="초기화" onClick={initialization} />
      </Form>
      {loading ? (
        <Loader />
      ) : postList.length ? (
        <>
          <PostList data={postList} visible={visible} setVisible={setVisible} />
          <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        </>
      ) : (
        <NoData>
          <h2>검색 결과가 없습니다.</h2>
        </NoData>
      )}
    </Layout>
  );
};

export default Forum;
