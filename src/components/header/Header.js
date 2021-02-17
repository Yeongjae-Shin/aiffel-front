import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  margin: 1em 0;
`;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5em;
`;

const LogoBox = styled.div`
  img {
    width: 150px;
    height: auto;
    object-fit: contain;
  }
`;

const ProfileBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;

  img {
    width: 35px;
    height: auto;
    margin-right: 5px;
    border-radius: 50%;
    object-fit: contain;
  }
`;

const Accordion = styled.div`
  position: absolute;
  top: 45px;
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
`;

const ContentBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.li`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  cursor: pointer;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: background 0.3s ease-in-out;
  }
`;

const Header = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    history.replace('/', null);
  };

  return (
    <Wrapper>
      <Container>
        <LogoBox>
          <img alt="로고" src="/aiffel_logo.png" />
        </LogoBox>
        <ProfileBox onMouseEnter={() => setVisible(true)}>
          <img alt="프로필" src="/profile.png" />
          {`${sessionStorage.getItem('username')}님`}
          {visible && (
            <Accordion onMouseLeave={() => setVisible(false)}>
              <ContentBox>
                <Content onClick={() => history.push('/profile')}>
                  내 프로필
                </Content>
                <Content onClick={handleLogout}>로그아웃</Content>
              </ContentBox>
            </Accordion>
          )}
        </ProfileBox>
      </Container>
    </Wrapper>
  );
};

export default Header;
