import styled, { css } from 'styled-components';
const BadgeBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    return css`
      display: inline-flex;
      justify-content: center;
      align-items: center;

      padding: 3px 8px;
      background-color: ${main};
      border-radius: 4px;
      font-size: 12px;
    `;
  }};
`;

export { BadgeBox };
