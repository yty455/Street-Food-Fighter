import styled, { css } from 'styled-components';

const StyledButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const black = props.theme.colors.black;
    const color = props.color ? props.theme.colors[props.color] : main;
    const size = props.font || '16px';
    const borderSize = props.bordersize || '0px';
    return css`
      padding: 5px 15px;
      /* border: none; */
      border-radius: 5px;
      border-width: ${borderSize};
      border-style: solid;
      border-color: ${black};
      background-color: ${color};
      color: ${black};
      text-align: center;

      //
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size};
    `;
  }};
`;

export { StyledButton };
