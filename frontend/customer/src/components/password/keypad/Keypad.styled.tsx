import styled, { css } from 'styled-components';

const KeypadContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;
    return css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      background-color: ${gray};
      width: 100%;
      position: fixed;
      bottom: 0;
      padding-top: 23px;
      padding-bottom: 23px;
    `;
  }};
`;

const Key = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;
    const lightgray = props.theme.colors.lightgray;
    return css`
      height: 60px;
      font-size: 24px;
      border: none;
      background-color: ${gray};
      color: ${lightgray};

      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }};
`;

const StyleImage = styled.img`
  position: fixed;
  z-index: 10;
  width: 50px;
`;

export { KeypadContainer, Key, StyleImage };
