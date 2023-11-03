import styled, { css } from 'styled-components';

const LevelContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;

    return css`
      display: flex;
      flex-direction: row;
      background-color: ${main};
      padding: 5px;
      border-radius: 5px;
      width: 120px;
      align-items: center;
      justify-content: space-around;
    `;
  }};
`;

const LevelText = styled.div`
  font-size: 14px;
`;
export { LevelContainer, LevelText };
