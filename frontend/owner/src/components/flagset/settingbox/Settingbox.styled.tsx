import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      background-color: ${white};
      position: fixed;
      right: 0;
      bottom: 60px;
      z-index: 3;
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
    `;
  }};
`;

const Title = styled.div`
  font-size: 20px;
`;
const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      border: 2px solid ${lightgray};
      padding: 10px 20px;
      border-radius: 10px;

      width: 160px;
    `;
  }};
`;
const DayContent = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      border: 3px solid ${lightgray};
      padding: 10px 20px;
      border-radius: 10px;

      display: flex;
      justify-content: space-between;

      width: 250px;
    `;
  }};
`;
const Text = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 18px;
    `;
  }};
`;

export { Container, Title, Content, DayContent, Text };
