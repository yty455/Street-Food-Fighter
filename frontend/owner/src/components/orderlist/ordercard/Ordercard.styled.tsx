import styled, { css } from 'styled-components';

const CardContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      background-color: ${white};
      width: 100%;
      padding: 15px 10px;
    `;
  }};
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 15px;
`;
const FlexRow2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StateBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    return css`
      background-color: ${main};
      width: 50px;
      height: 50px;

      border-radius: 10px;
      font-size: 18px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    `;
  }};
`;

const RequireBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const font = props.theme.fonts.air;
    return css`
      border: 1.5px solid ${main};
      font-family: ${font};
      border-radius: 5px;
      padding: 5px;
    `;
  }};
`;

const MenuTitle = styled.div`
  font-size: 20px;
  width: 220px;
`;

const MenuList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const color = props.theme.colors.gray;

    return css`
      font-family: ${font};
      color: ${color};
    `;
  }};
`;

const Time = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 20px;
      width: 50px;
      text-align: center;
    `;
  }};
`;
export { FlexRow2, CardContainer, FlexRow, StateBox, MenuTitle, Time, RequireBox, MenuList };
