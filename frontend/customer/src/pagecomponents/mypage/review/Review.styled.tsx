import styled, { css } from 'styled-components';

const ReviewPageStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      overflow: scroll;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      height: 93vh;
      background-color: ${gray};
      align-items: center;
      gap: 3px;
    `;
  }};
`;

const ReviewTitle = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  min-height: 60px;
  font-size: 32px;
  justify-content: center;
  align-items: center;
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  background-color: white;
  flex-direction: column;
  margin-top: 5px;
`;

const ReviewStoreName = styled.div`
  display: flex;
  font-size: 24px;
  padding: 5px;
`;

const ReviewDate = styled.div`
  display: flex;
  padding: 5px;
  font-size: 14px;
  padding: 5px;
`;

const ReviewIconContainer = styled.div`
  display: flex;
  padding: 5px;
  gap: 4px;
`;

const MenuContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      display: flex;
      gap: 10px;
      align-items: center;
      overflow-y: auto;
      white-space: nowrap;
      padding: 5px;
    `;
  }};
`;

const MenuText = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      font-size: 16px;
      height: 30px;
      border: 2px solid;
      border-radius: 23px;
      border-color: ${gray};
      padding: 5px;
      display: flex;
      align-items: center;
      width: max-content;
      white-space: nowrap;
    `;
  }};
`;

const ReviewContent = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 18px;
      padding: 5px;
      white-space: normal;
    `;
  }};
`;
const ReviewContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  white-space: nowrap;
  padding-bottom: 10px;
`;

const ReviewIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export {
  ReviewIconContainer,
  ReviewContainer,
  ReviewContent,
  MenuContainer,
  MenuText,
  ReviewIcon,
  ReviewDate,
  ReviewStoreName,
  ReviewItem,
  ReviewTitle,
  ReviewPageStyle,
};
