import styled, { css } from 'styled-components';

const OperButtonList = styled.div`
  display: flex;
  flex-direction: row;
`;

const OperButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    const main = props.theme.colors.main;
    const bgcolor = props.type === 'true' ? main : lightgray;
    return css`
      display: flex;
      background-color: ${bgcolor};
      width: 50vw;
      height: 150px;
      justify-content: center;
      align-items: center;

      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    `;
  }};
`;

const OperText = styled.div`
  display: flex;
  text-align: center;
  font-size: 40px;
  /* width: 50%; */
`;

const MainContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      /* display: flex; */
      background-color: ${light};
      height: 100vh;
    `;
  }};
`;

const MenuList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      justify-content: space-evenly;
      align-content: stretch;
      flex-wrap: wrap;

      height: calc(100vh - 150px);
      padding-top: 40px;
    `;
  }};
`;

const Menu = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      background-color: ${white};
      border-radius: 10px;
      width: 45vw;
      height: 45vw;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      gap: 20px;

      font-size: 20px;
    `;
  }};
`;
export { MainContainer, OperButtonList, OperButton, OperText, MenuList, Menu };
