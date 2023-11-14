import styled, { css } from 'styled-components';

const OrderDetailStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      background-color: ${gray};
      height: 100vh;
      overflow: hidden;
    `;
  }};
`;

const OrderInfo = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      background-color: ${gray};
      height: 100vh;
      overflow: hidden;
    `;
  }};
`;

export { OrderInfo, OrderDetailStyle };
