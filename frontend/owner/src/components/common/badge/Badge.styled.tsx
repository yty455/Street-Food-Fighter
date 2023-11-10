import styled, { css } from 'styled-components';

const StyledBadge = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const black = props.theme.colors.black;
    const bgcolor = props.color ? props.theme.colors[props.color] : main;
    const color = props.color === 'red' ? props.theme.colors.light : black;
    const size = props.fontsize || '16px';
    return css`
      padding: 5px 15px;
      border: none;
      border-radius: 5px;
      background-color: ${bgcolor};
      color: ${color};
      text-align: center;

      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size};
    `;
  }};
`;

export { StyledBadge };
