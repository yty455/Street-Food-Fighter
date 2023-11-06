import styled, { css } from 'styled-components';

const OptionContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      background-color: ${white};

      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 20px;
      gap: 25px;

      margin-top: 15px;
    `;
  }};
`;
const PriceBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Price = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
    `;
  }};
`;

export { OptionContainer, PriceBox, Price };
