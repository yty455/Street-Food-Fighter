import styled, { css } from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  bottom: 7vh;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;
const FilterBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      height: 600px;
      background-color: ${white};
      border-radius: 20px 20px 0px 0px;
    `;
  }};
`;
const FilterTitle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    return css`
      color: ${black};
      font-size: 30px;
      padding-left: 30px;
    `;
  }};
`;
const CloseButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const black = props.theme.colors.black;
    return css`
      border: none;
      width: 100%;
      background-color: ${main};
      color: ${black};
      cursor: pointer;
      padding: 10px;
      text-align: center;
      font-size: 20px;
    `;
  }};
`;

export { ModalOverlay, FilterBox, FilterTitle, CloseButton };
