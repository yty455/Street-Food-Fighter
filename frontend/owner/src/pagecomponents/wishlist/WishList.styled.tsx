import styled, { css } from 'styled-components';

const StyledLocation = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.theme.colors.light;
    return css`
      width: 100vw;
      background-color: ${bgcolor};
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    `;
  }};
`;

const TextNo = styled.div`
  width: 80vw;
  font-size: 20px;
  text-align: center;
`;

const SubTextNo = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const airfont = props.theme.fonts.air;
    return css`
      text-align: center;
      width: 80vw;
      font-size: 20px;
      font-family: ${airfont};
    `;
  }};
`;

const ContentNo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 10px;
`;
export { StyledLocation, TextNo, SubTextNo, ContentNo };
