import styled, { css } from 'styled-components';

const MypageContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: calc(100vh - 100px);
      background-color: ${light};
      align-items: center;
      gap: 20px;
      padding-top: 20px;
    `;
  }};
`;

export { MypageContainer };
