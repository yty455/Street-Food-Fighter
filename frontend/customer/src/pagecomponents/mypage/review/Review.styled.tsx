import styled, { css } from 'styled-components';

const ReviewPageStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: 93vh;
      background-color: ${light};
      align-items: center;
      gap: 20px;
    `;
  }};
`;

export { ReviewPageStyle };
