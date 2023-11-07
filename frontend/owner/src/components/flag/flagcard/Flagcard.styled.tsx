import styled, { css } from 'styled-components';

const CardWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bcolor = props.theme.colors.light;
    return css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      background-color: ${bcolor};
      padding: 20px 10px;
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
      width: 200px;
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
