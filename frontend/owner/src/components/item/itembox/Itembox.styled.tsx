import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      background-color: ${white};
      flex-direction: column;
    `;
  }};
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const MenuContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 47vw;
  gap: 10px;
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
      border-radius: 10px;

      width: 80px;
      height: 80px;
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

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const air = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-family: ${air};
      font-size: 18px;
      width: 100%;
      text-align: right;
      border-bottom: 1px solid ${black};
    `;
  }};
`;

const OptionContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      border-top: 1px solid ${lightgray};
      padding: 20px;
      gap: 14px;
    `;
  }};
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionContent = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const air = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-family: ${air};
      font-size: 14px;
      width: 70%;
      text-align: left;
      border-bottom: 1px solid ${black};
      padding-bottom: 3px;
    `;
  }};
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;
export { ButtonList, Container, MenuBox, MenuContentBox, MenuImage, LittleTitle, Content, OptionContainer, OptionBox, OptionContent };
