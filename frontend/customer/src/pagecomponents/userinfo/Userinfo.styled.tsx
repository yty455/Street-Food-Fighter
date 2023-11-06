import styled, { css } from 'styled-components';

const UserInfoContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: ${light};
      align-items: center;
      gap: 20px;
    `;
  }};
`;
const Topbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      width: 100%;
      align-items: center;
      padding: 15px;
      font-size: 20px;
      justify-content: space-between;
    `;
  }};
`;

const TopContent = styled.div`
  display: flex;
  width: 62%;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LogoutBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
`;
const LogoutText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;
    const font = props.theme.fonts.air;

    return css`
      display: flex;
      color: ${gray};
      font-family: ${font};
    `;
  }};
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CameraIcon = styled.img`
  position: absolute;
  right: 3px;
  bottom: 4px;
  height: 25px;
`;

const ProfileImage = styled.img`
  height: 80px;
`;

export { ImageContainer, CameraIcon, ProfileImage, UserInfoContainer, Topbar, TopContent, ContentContainer, LogoutBox, LogoutText };
