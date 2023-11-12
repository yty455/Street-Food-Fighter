import styled, { css } from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding-top: 3vh;

  height: calc(100vh - 55px);
  overflow-y: auto;

  padding-bottom: 70px;
`;

export { Content };
