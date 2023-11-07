import styled, { css } from 'styled-components';

const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 20px;
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 24px;
  gap: 20px;

  justify-content: center;

  padding: 20px 0px;
`;

const FlagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-bottom: 60px;
  height: calc(100vh - 230px);
  overflow-y: auto;
`;

const NoFlag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 20px;
  height: 400px;
  text-align: center;
`;
export { TabBox, PageTitle, FlagList, NoFlag };
