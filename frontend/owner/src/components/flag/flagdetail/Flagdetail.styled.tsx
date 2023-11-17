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
      bottom: 0;
      left: 0;
      z-index: 1;

      gap: 10px;
    `;
  }};
`;
const UserGradeImage = styled.img.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    return css`
      border-radius: 5px;
      background-color: ${main};

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;

      padding: 2px;
    `;
  }};
`;
const BigContentBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.theme.colors.white;
    return css`
      background-color: ${bgcolor};
      padding: 20px;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
  }};
`;

const Title = styled.div`
  font-size: 20px;
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};

      font-size: 18px;
    `;
  }};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const GradeNum = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const GradeList = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const UserTitle = styled.div`
  font-size: 18px;
`;

const UserMenu = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};

      font-size: 16px;
    `;
  }};
`;

const UserRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
export { Container, UserGradeImage, Title, BigContentBox, Content, ContentBox, GradeList, GradeNum, UserList, UserTitle, UserMenu, UserRight };
