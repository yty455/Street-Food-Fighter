import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: ${gray};

      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 1;
    `;
  }};
`;
const MenuBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      background-color: ${white};

      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px;
      gap: 25px;

      margin-top: 15px;
    `;
  }};
`;

const MenuContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  gap: 10px;
`;

const ImageBox = styled.div`
  position: relative;
`;
const MenuImage = styled.img.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const white = props.theme.colors.white;
    return css`
      display: flex;
      background-color: ${white};
      align-items: center;
      justify-content: center;
      border: 1px solid ${main};
      border-radius: 14px;

      width: 80px;
      height: 80px;
    `;
  }};
`;

const Edit = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;
    const lightgray = props.theme.colors.lightgray;
    const font = props.theme.fonts.air;
    return css`
      background-color: #4d4c49d1;
      border-radius: 0px 0px 14px 14px;
      color: ${lightgray};

      position: absolute;
      bottom: -0.5px;
      width: 100%;
      text-align: center;
      padding: 3px 0px;

      font-family: ${font};
      font-size: 14px;
    `;
  }};
`;
const LittleTitle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const air = props.theme.fonts.air;
    return css`
      font-family: ${air};
      font-size: 14px;
    `;
  }};
`;

export { ImageBox, Container, MenuBox, Edit, MenuContentBox, MenuImage, LittleTitle };
