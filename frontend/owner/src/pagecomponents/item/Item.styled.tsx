import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      background-color: ${lightgray};
      height: 100vh;
    `;
  }};
`;

const Content = styled.div`
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding-bottom: 70px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export { Container, Content };
