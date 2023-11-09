import styled, { css } from 'styled-components';

const CardWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    const main = props.theme.colors.main;
    const bgcolor = props.theme.colors.white;
    const bcolor = props.selected === 'true' ? main : lightgray;

    return css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      width: 90vw;
      background-color: ${bgcolor};
      border: 2px solid ${bcolor};
      border-radius: 10px;
      padding: 20px 15px;
      gap: 20px;
    `;
  }};
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-family: ${font};
      color: ${black};
      width: 175px;
    `;
  }};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
`;

const Title = styled.div`
  width: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export { CardWrapper, Content, Row, Title, ContentBox };
