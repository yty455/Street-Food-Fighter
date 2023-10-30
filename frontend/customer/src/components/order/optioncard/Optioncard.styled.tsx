import styled, { css } from 'styled-components';

const OptionList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: ${white};
      gap: 16px;

      border-top: 2px solid ${lightgray};
    `;
  }};
`;

const OptionBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: column;
      padding: 20px 25px;
      background-color: ${white};
      gap: 16px;

      border-top: 2px solid ${lightgray};
    `;
  }};
`;

const CountBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: row;
      padding: 20px 25px;
      background-color: ${white};
      gap: 16px;
      justify-content: space-between;
      border-top: 2px solid ${lightgray};
    `;
  }};
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 18px;
`;

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    return css`
      color: ${black};
      font-size: 16px;
      font-family: ${font};
    `;
  }};
`;

export { OptionBox, CountBox, RowBox, Content, Name, Airfont, OptionList };
