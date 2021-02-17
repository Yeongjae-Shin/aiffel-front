import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1em;
  color: ${(props) => props.color};
  border-radius: 3px;
  border: none;
  background: transparent;
  vertical-align: middle;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: rgba(200, 200, 200, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Pagination = ({ page, setPage, totalPage }) => {
  const pageNumbers = [...Array(totalPage).keys()].map((el) => el + 1);

  const handleIncrease = () => {
    setPage(page + 1);
  };

  const handleDecrease = () => {
    setPage(page - 1);
  };

  return (
    <Wrapper>
      <Container>
        <PageBtn onClick={handleDecrease} disabled={page === 1}>
          이전
        </PageBtn>
        {pageNumbers.map((number, i) => {
          return (
            <PageBtn
              key={i}
              onClick={() => setPage(number)}
              color={i + 1 === page ? '#ffbc12' : '#000'}
            >
              {number}
            </PageBtn>
          );
        })}
        <PageBtn onClick={handleIncrease} disabled={page === totalPage}>
          다음
        </PageBtn>
      </Container>
    </Wrapper>
  );
};

export default Pagination;
