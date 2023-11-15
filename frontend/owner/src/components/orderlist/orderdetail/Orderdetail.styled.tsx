import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.theme.colors.white;
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: ${bgcolor};

      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 100;
    `;
  }};
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
`;

const TableHeader = styled.th.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;
    const font = props.theme.fonts.air;
    return css`
      padding: 10px;
      text-align: left;
      background-color: ${gray};
      font-family: ${font};
      border: 1px solid #ddd;
      width: 130px;
    `;
  }};
`;

const TableCell = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 10px;
      font-family: ${font};
      border: 1px solid #ddd;
    `;
  }};
`;
const Content = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  height: calc(100vh - 60px);
  overflow-y: auto;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const TextBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const bgcolor = props.theme.colors.light;
    return css`
      padding: 10px;
      font-family: ${font};
      background-color: ${bgcolor};
      border-radius: 10px;
      font-size: 18px;

      margin-top: 10px;
    `;
  }};
`;

const Title = styled.div`
  font-size: 22px;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const ReviewScore = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 22px;
    `;
  }};
`;
export { Title, FlexRow, Container, Content, TableContainer, TableHeader, TableCell, TextBox, ReviewList, ReviewScore };
