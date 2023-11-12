import styled, { css } from 'styled-components';

const ChartBox = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Center = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  text-align: center;
`;
export { ChartBox, Center };
