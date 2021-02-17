import React from 'react';
import styled from 'styled-components';

import Header from '../components/header/Header';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Header />
        {children}
      </Container>
    </Wrapper>
  );
};

export default Layout;
