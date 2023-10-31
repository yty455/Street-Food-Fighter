import styled, { css } from 'styled-components';

const StyledButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const black = props.theme.colors.black;

    return css`
      padding: 5px 15px;
      border: none;
      border-radius: 5px;
      background-color: ${main};
      color: ${black};
      text-align: center;
    `;
  }};
`;

export { StyledButton };
