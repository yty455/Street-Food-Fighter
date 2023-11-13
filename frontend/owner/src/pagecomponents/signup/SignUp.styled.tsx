import styled, { css } from 'styled-components';

const StyleSignUp = styled.div.attrs<any>((props) => ({}))`
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
      height: 15%;
      justify-content: center;
      align-items: flex-end;
    `;
  }};
`;

const BodyStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      width: 100%;
      height: 60%;
      padding-top: 10%;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `;
  }};
`;

const FooterStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      width: 100%;
      height: 25%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    `;
  }};
`;

const InputWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const marginTop = props.marginTop || '0px';
    return css`
      padding: 0px 30px;
      width: 100%;
      margin-top: ${marginTop};
    `;
  }};
`;

const ButtonWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      width: 100%;
      height: 55px;
      padding: 5px 30px;
    `;
  }};
`;

export { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper };
