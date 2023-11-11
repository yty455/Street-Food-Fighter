import styled, { css } from 'styled-components';

const StyledLocation = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.theme.colors.light;
    return css`
      width: 100vw;
      background-color: ${bgcolor};
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    `;
  }};
`;

const TextNo = styled.div`
  width: 80vw;
  font-size: 20px;
  text-align: center;
`;

const SubTextNo = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const airfont = props.theme.fonts.air;
    return css`
      text-align: center;
      width: 80vw;
      font-size: 20px;
      font-family: ${airfont};
    `;
  }};
`;

const ContentNo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 10px;
`;

const ChartContainer = styled.div`
  padding: 20px;
  height: calc(100vh - 110px);
  overflow-y: auto;
`;
const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChartTitleFood = styled.div`
  width: 100px;
  font-size: 18px;
  border-bottom: 0.6px solid black;
  text-align: center;
`;
const ChartTitlePeople = styled.div`
  width: calc(100vw - 160px);
  font-size: 18px;
  border-bottom: 0.6px solid black;
  text-align: center;
`;
export { ChartTitle, ChartContainer, StyledLocation, TextNo, SubTextNo, ContentNo, ChartTitleFood, ChartTitlePeople };
