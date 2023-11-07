import styled, { css } from 'styled-components';
const StyledTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 3;
  top: 10px;
  left: 0;
  right: 0;
  gap: 8px;
`;
const Topbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Filter = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;

    return css`
      display: flex;
      align-items: center;
      justify-content: space-around;

      width: 50px;
      height: 50px;
      background-color: ${main};
      border-radius: 10px;
    `;
  }};
`;
const Research = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;

    return css`
      display: flex;
      align-items: center;

      padding: 10px 20px;
      background-color: ${main};
      border-radius: 10px;

      font-size: 14px;
      height: 35px;
    `;
  }};
`;

const Position = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;
    const font = props.theme.fonts.air;
    return css`
      background-color: ${light};
      border-radius: 10px;
      height: 50px;
      width: 300px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: ${font};
      font-size: 20px;
    `;
  }};
`;

const Curpos = styled.div`
  z-index: 3;
  position: fixed;
  right: 10px;
  bottom: 170px;
`;

const CardList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      position: fixed;
      bottom: 70px;
      z-index: 3;
      display: flex;
      gap: 20px;
      width: 100vw;
      overflow-x: scroll;
      white-space: nowrap;
      flex-direction: row;
    `;
  }};
`;

export { CardList, StyledTop, Topbar, Filter, Research, Position, Curpos };
