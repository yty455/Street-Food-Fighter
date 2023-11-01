import styled, { css } from 'styled-components';

const MypageContainer = styled.div.attrs<any>((props) => ({}))`
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

const Topbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 15px;

      font-size: 20px;
    `;
  }};
`;

export { MypageContainer, Topbar };
