import styled, { css } from 'styled-components';

const Topbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;
const Title = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding-left: 50px;
`;

const AlertImage = styled.div`
  padding: 10px;
  /* margin-right: 15px; */
`;
export { Topbar, Title, AlertImage };
