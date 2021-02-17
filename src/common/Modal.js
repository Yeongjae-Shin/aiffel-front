import React, { useEffect } from 'react';
import styled from 'styled-components';

import Portal from './Portal';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1em;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease-in-out 0s;
  z-index: 9999;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const ChildWrapper = styled.div`
  padding: 24px;
`;

const Modal = ({ visible, setVisible, children }) => {
  useEffect(() => {
    document.body.style.overflow = visible && 'hidden';
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    });

    return () => document.body.style.removeProperty('overflow');
  }, [visible]);

  return (
    <Portal elementId="modal-root">
      <Wrapper>
        <Container>
          <ChildWrapper>
            <CloseButtonBox>
              <img
                alt="닫기"
                src="https://rojqgcvtavgk5531800.cdn.ntruss.com/icn-close.png"
                onClick={() => setVisible(false)}
              />
            </CloseButtonBox>
            {children}
          </ChildWrapper>
        </Container>
      </Wrapper>
    </Portal>
  );
};

export default Modal;
