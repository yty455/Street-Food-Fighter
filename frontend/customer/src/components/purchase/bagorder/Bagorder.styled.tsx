import styled, { css } from 'styled-components';

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const gray = props.theme.colors.gray;
    return css`
      font-family: ${font};
      color: ${gray};
    `;
  }};
`;

const MenuBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: column;
      padding: 15px 20px;
      border-top: 2.5px solid ${lightgray};
    `;
  }};
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 17px;
`;

const Title = styled.div`
  font-size: 18px;
  padding: 10px 0px;
`;

const InfoList = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: 260px;
`;
export { Airfont, MenuBox, InfoBox, Title, InfoList };
