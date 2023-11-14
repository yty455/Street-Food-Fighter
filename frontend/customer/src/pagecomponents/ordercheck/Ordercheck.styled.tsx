import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 30px;
`;
const StyledTopbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.gray;
    return css`
      display: flex;
      background-color: ${white};
      height: 55px;
      align-items: center;
      justify-content: center;

      font-size: 24px;
      width: 100%;

      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    `;
  }};
`;

const BigText = styled.div`
  font-size: 24px;
`;

const SmallText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const color = props.theme.colors.gray;
    return css`
      font-size: 20px;
      font-family: ${font};
      color: ${color};
    `;
  }};
`;

export { Container, StyledTopbar, BigText, SmallText };
