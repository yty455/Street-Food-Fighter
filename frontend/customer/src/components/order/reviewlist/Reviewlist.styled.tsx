import styled, { css } from 'styled-components';

const BoxContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      background-color: ${lightgray};
      gap: 6px;

      height: calc(100vh - 265px);
      overflow-y: auto;
    `;
  }};
`;
const NoReview = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${white};
      height: calc(100vh - 210px);
      font-size: 20px;
    `;
  }};
`;

export { BoxContainer, NoReview };
