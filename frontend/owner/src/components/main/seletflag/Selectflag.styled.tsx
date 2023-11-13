import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;

      gap: 20px;

      background-color: ${white};

      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0;
      z-index: 110;
    `;
  }};
`;

const Title = styled.div`
  font-size: 24px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  align-items: center;
`;

const Today = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const light = props.theme.colors.light;
    return css`
      background-color: ${black};
      color: ${light};
      font-size: 20px;
      border-radius: 10px;
      padding: 10px 15px;
    `;
  }};
`;

export { Container, Title, TitleBox, Today };
