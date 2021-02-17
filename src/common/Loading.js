import React from 'react';
import styled from 'styled-components';

const CustomLoader = styled.div`
  margin: 360px auto;
  width: 7em;
  height: 7em;
  font-size: 10px;
  text-indent: -9999em;
  border-radius: 50%;
  border-top: 0.7em solid rgba(255, 188, 18, 0.2);
  border-right: 0.7em solid rgba(255, 188, 18, 0.2);
  border-bottom: 0.7em solid rgba(255, 188, 18, 0.2);
  border-left: 0.7em solid #ffbc12;
  transform: translateZ(0);
  animation: rotate 0.9s infinite linear;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <CustomLoader />;
};

export default Loader;
