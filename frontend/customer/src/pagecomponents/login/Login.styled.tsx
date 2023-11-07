import styled, { css } from 'styled-components';

const StyleLogin = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
        return css`
        width: 100vw;
        height: 100vh;
      /* position: fixed;
      bottom: 70px;
      z-index: 3;
      display: flex;
      gap: 20px;
      width: 100vw;
      overflow-x: scroll;
      white-space: nowrap;
      flex-direction: row; */
    `;
    }};
`;
const HeaderStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
        return css`
        font-size: 36px;
        display: flex;
        width: 100vw;
        height: 20%;
        justify-content: center;
        align-items: flex-end;;
    `;
    }};
`;

const BodyStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
        return css`
      margin-top:10%;
      width: 100%;
      height: 60%;

    `;
    }};
`;

const FooterStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
        return css`
      width: 100%;
      height: 20%;

    `;
    }};
`;

const InputWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
        const marginTop = props.marginTop || '0px';
        return css`
        padding:0px 30px;
        margin-top: ${marginTop};
    `;
    }};
`;

export { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle };
