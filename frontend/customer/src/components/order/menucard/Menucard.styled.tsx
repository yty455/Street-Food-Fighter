import styled, { css } from 'styled-components';

const CardContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      background-color: ${white};
      gap: 16px;
    `;
  }};
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Name = styled.div`
  font-size: 18px;
`;

const InfoList = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Price = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const font = props.theme.fonts.air;
    return css`
      color: ${black};
      font-size: 16px;
      font-family: ${font};
    `;
  }};
`;

export { CardContainer, LeftContainer, Name, Price, InfoList };
