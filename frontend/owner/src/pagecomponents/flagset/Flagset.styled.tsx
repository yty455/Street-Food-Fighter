import styled, { css } from 'styled-components';
const StyledTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 3;
  top: 10px;
  left: 0;
  right: 0;
  gap: 8px;
`;
const Topbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Position = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;
    const font = props.theme.fonts.air;
    return css`
      background-color: ${light};
      border-radius: 10px;
      height: 50px;
      width: 310px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: ${font};
      font-size: 20px;
    `;
  }};
`;
const Curpos = styled.div`
  z-index: 3;
  position: fixed;
  right: 10px;
  bottom: 180px;
`;

const SettingBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      background-color: ${white};

      position: fixed;
      right: 0;
      bottom: 60px;
      z-index: 3;

      width: 100%;
      height: 120px;
    `;
  }};
`;

export { StyledTop, Topbar, Position, Curpos, SettingBox };
