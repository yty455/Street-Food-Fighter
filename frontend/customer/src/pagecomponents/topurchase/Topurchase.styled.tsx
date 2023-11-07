import styled, { css } from 'styled-components';

const TopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Cashline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
`;

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};
    `;
  }};
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      background-color: ${lightgray};
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - 125px);
      overflow-y: auto;
      gap: 20px;
    `;
  }};
`;
const VendorBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      flex-direction: row;
      padding: 15px 15px 10px 15px;
      gap: 15px;
    `;
  }};
`;
const Requested = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      flex-direction: column;
      padding: 15px;
      gap: 15px;
    `;
  }};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Location = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;

    return css`
      font-size: 14px;
      color: ${gray};
    `;
  }};
`;

const Orderlist = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      flex-direction: column;
    `;
  }};
`;
const More = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      border-top: 3px solid ${lightgray};
      gap: 10px;
      padding: 14px 10px;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    `;
  }};
`;

export { Cashline, Requested, FlexRow, Airfont, TopBox, Title, Content, VendorBox, FlexColumn, Location, Orderlist, More };
