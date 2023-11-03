import styled, { css } from 'styled-components';

const UserInfoContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: 100vh;
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
      align-items: center;
      padding: 15px;
      font-size: 20px;
      justify-content: space-between;
    `;
  }};
`;

const TopContent = styled.div`
  display: flex;
  width: 62%;
  justify-content: space-between;
`;
export { UserInfoContainer, Topbar, TopContent };
