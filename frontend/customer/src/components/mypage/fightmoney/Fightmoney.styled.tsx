import styled, { css } from 'styled-components';

const PointContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      background-color: ${white};
      align-items: center;
      gap: 10px;
      width: 90vw;
      border-radius: 10px;
      padding: 25px;
    `;
  }};
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
`;

const ChargeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 13px;
`;

const Point = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};
      font-size: 20px;
    `;
  }};
`;

export { PointContainer, TitleBox, ChargeBox, Point };
