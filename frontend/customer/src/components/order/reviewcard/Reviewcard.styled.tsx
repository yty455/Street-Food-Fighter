import styled, { css } from 'styled-components';

const CardContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: ${white};
      gap: 10px;
    `;
  }};
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Name = styled.div`
  font-size: 20px;
`;
const TitleList = styled.div`
  display: flex;
  gap: 5px;
  font-size: 12px;
  flex-direction: column;
`;
const Starlist = styled.div`
  display: flex;
  gap: 5px;
  font-size: 12px;
  align-items: center;
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    return css`
      color: ${black};
      font-size: 16px;
      font-family: ${font};
      padding-left: 10px;
    `;
  }};
`;

export { CardContainer, TitleList, Profile, Name, Content, Starlist };
