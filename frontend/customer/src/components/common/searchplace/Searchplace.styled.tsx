import styled, { css } from 'styled-components';

const ModalOverlay = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      position: fixed;
      top: 0;
      left: 0;

      width: 100vw;
      height: 100vh;
      z-index: 1000;
      background-color: ${white};

      /* padding: 20px; */
    `;
  }};
`;
const TopTitle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    return css`
      color: ${black};
      font-size: 24px;
      display: flex;
      justify-content: center;
      flex-grow: 1;
      padding-right: 30px;
    `;
  }};
`;
const SearchBar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const lightgray = props.theme.colors.lightgray;
    return css`
      color: ${black};
      background-color: ${lightgray};
      display: flex;
      border-radius: 10px;
      align-items: center;
      padding: 10px 20px;
      margin-top: 20px;
      gap: 15px;
    `;
  }};
`;
const SearchText = styled.input.attrs({ type: 'text' })`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    const lightgray = props.theme.colors.lightgray;
    return css`
      color: ${black};
      background-color: ${lightgray};
      font-size: 18px;
      font-family: ${font};
      border: none;
      outline: none;
      width: 100%;
      padding: 5px;
    `;
  }};
`;
const Place = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const white = props.theme.colors.white;
    const font = props.theme.fonts.air;
    const lightgray = props.theme.colors.lightgray;
    return css`
      color: ${black};
      background-color: ${white};
      font-size: 18px;
      font-family: ${font};
      /* border: 1px solid ${lightgray}; */
      width: 100%;
      padding: 10px;
    `;
  }};
`;
const BoldText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    return css`
      color: ${black};
    `;
  }};
`;
const LightText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;
    const font = props.theme.fonts.air;
    return css`
      color: ${gray};
      font-family: ${font};
    `;
  }};
`;

const List = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      background-color: ${lightgray};

      display: flex;
      gap: 10px;
      flex-direction: column;

      overflow-y: auto;
      height: calc(100vh - 140px);

      padding: 10px 0px 30px 0px;
    `;
  }};
`;
const SearchTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export { NoResult, ModalOverlay, List, Place, SearchText, SearchTop, TopTitle, SearchBar, BoldText, LightText };
