import styled, { css } from 'styled-components';

const StyledNavbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      width: 100%;
      height: 8vh;
      /* padding: 10px 0px; */
      background-color: ${white};
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 3;
      /* position: fixed;
      bottom: 0; */
    `;
  }};
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const NavText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const black = props.theme.colors.black;
    const color = props.curnav == props.cur ? main : black;
    const font = props.theme.fonts.bold;
    return css`
      color: ${color};
      font-size: 11px;
      font-family: ${font};
    `;
  }};
`;

export { StyledNavbar, Flexbox, NavText };
