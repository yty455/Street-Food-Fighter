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
    const white = props.theme.colors.white;
    const red = props.theme.colors.red;
    const green = props.theme.colors.green;
    const bcolor = props.type === 'REFUSED' ? red : props.type === 'COMPLETED' ? green : main;
    const bgcolor = props.type === 'REFUSED' || props.type === 'COMPLETED' ? white : main;

    return css`
      background-color: ${bgcolor};
      border: 1px solid ${bcolor};
      width: 55px;
      height: 55px;

      border-radius: 10px;
      font-size: 20px;
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
      font-size: 18px;
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
