import styled, { css } from 'styled-components';

const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  padding: 0px 10px 20px 0px;
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 24px;
  gap: 20px;

  justify-content: center;

  padding: 30px 0px;
`;

export { TabBox, PageTitle };
