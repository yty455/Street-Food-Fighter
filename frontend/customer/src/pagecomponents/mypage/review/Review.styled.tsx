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
  min-height: 65px;
  font-size: 35px;
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
  margin-top: 10px;
`;

const ReviewStoreName = styled.div`
  display: flex;
  font-size: 24px;
  padding: 5px;
`;

const ReviewDate = styled.div`
  display: flex;
  padding: 5px;
  font-size: 16px;
  padding: 5px;
`;

const ReviewIcon = styled.div`
  display: flex;
  padding: 5px;
`;
const MenuContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  overflow-y: auto;
  white-space: nowrap;
  padding: 5px;
`;

const MenuText = styled.div`
  font-size: 16px;
  height: 30px;
  border: 2px solid;
  border-radius: 23px;
  padding: 5px;
  display: flex;
  align-items: center;
  width: max-content;
  white-space: nowrap;
`;

const ReviewContent = styled.div`
  font-size: 18px;
  padding: 5px;
`;

export { ReviewContent, MenuContainer, MenuText, ReviewIcon, ReviewDate, ReviewStoreName, ReviewItem, ReviewTitle, ReviewPageStyle };
