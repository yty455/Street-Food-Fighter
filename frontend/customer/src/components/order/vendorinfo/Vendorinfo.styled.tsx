import styled, { css } from 'styled-components';
const VendorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const BoxContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: ${white};
      gap: 10px;
    `;
  }};
`;
const Title = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;

    return css`
      color: ${black};
      font-size: 20px;
    `;
  }};
`;
const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    return css`
      color: ${black};
      font-size: 16px;
      font-family: ${font};
    `;
  }};
`;

const ContentTd = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    return css`
      color: ${black};
      font-size: 16px;
      font-family: ${font};
    `;
  }};
`;

export { VendorContainer, BoxContainer, Title, Content, ContentTd };
