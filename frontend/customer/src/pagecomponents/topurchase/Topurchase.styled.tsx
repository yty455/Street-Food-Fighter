import styled, { css } from 'styled-components';

const TopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      background-color: ${lightgray};
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - 140px);
    `;
  }};
`;
export { TopBox, Title, Content };
