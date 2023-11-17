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
  bottom: 280px;
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
      height: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
    `;
  }};
`;

const Title = styled.div`
  font-size: 20px;
`;
const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      border: 2px solid ${lightgray};
      padding: 10px 20px;
      border-radius: 10px;

      width: 160px;
    `;
  }};
`;
const DayContent = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      border: 3px solid ${lightgray};
      padding: 10px 20px;
      border-radius: 10px;

      display: flex;
      justify-content: space-between;

      width: 250px;
    `;
  }};
`;
const Text = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 18px;
    `;
  }};
`;

export { StyledTop, Topbar, Position, Curpos, SettingBox, Title, Content, DayContent, Text };
