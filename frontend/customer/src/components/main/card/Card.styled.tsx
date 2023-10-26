import styled, { css } from 'styled-components';
const CardBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.theme.colors.light;
    const main = props.theme.colors.main;
    return css`
      display: flex;
      justify-content: center;
      gap: 25px;
      align-items: center;
      border: 3px solid ${main};
      min-width: 225px;
      height: 98px;
      background-color: ${bgcolor};
      border-radius: 10px;
    `;
  }};
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ContentBox2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Text = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};
      font-size: 12px;
      color: ${black};
    `;
  }};
`;
export { CardBox, ContentBox, ContentBox2, Text };
