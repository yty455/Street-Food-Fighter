import styled, { css } from 'styled-components';

const ProfileContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      background-color: ${white};
      align-items: center;
      gap: 20px;
      width: 90vw;
      border-radius: 10px;
      padding: 25px;
    `;
  }};
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
`;
const ProfileList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};
      font-size: 14px;
    `;
  }};
`;

const LevelList = styled.div`
  display: flex;
  gap: 5px;
`;
const Nickname = styled.div`
  font-size: 24px;
`;

const RowDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export { RowDisplay, ProfileContainer, List, StyledButton, Airfont, LevelList, Nickname, ProfileList };
