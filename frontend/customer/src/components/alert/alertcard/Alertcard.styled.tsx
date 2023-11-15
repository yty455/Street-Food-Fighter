import styled, { css } from 'styled-components';

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-family: ${font};
      color: ${black};
      width: 100%;
    `;
  }};
`;
const Daybefore = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-size: 12px;
      font-family: ${font};
    `;
  }};
`;
const Vendorname = styled.span.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const main = props.theme.colors.main;
    return css`
      font-family: ${font};
      color: ${main};
      width: 100%;
    `;
  }};
`;

const AlertBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      padding: 15px 20px;
      width: 90vw;
      background-color: ${white};
      border-radius: 10px;
      gap: 20px;
    `;
  }};
`;

const Title = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const WarnText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const red = props.theme.colors.red;
    return css`
      font-family: ${font};
      color: ${red};
      width: 100%;
      padding-left: 10px;
    `;
  }};
`;
export { WarnText, Airfont, AlertBox, Vendorname, Title, Daybefore, BottomBox, ButtonList };
