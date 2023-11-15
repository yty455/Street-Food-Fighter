import styled, { css } from 'styled-components';

const LeaveReviewPageStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      overflow: scroll;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      height: 93vh;
      background-color: ${white};
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
  padding: 55px 0px;
`;

const ReviewIcon = styled.img`
  width: 55px;
  height: 55px;
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
      padding: 5px 10px;
      display: flex;
      align-items: center;
      width: max-content;
      white-space: nowrap;
    `;
  }};
`;

const ReviewIconContainer = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 55px;
`;

const InputWrapper = styled.div`
  width: 80%;
`;
const ButtonWrapper = styled.div`
  width: 80%;
  height: 50px;
  bottom: 100px;
  position: absolute;
  /* margin-top: 150px; */
`;

export { ButtonWrapper, InputWrapper, ReviewIconContainer, MenuText, MenuContainer, ReviewIcon, ReviewTitle, LeaveReviewPageStyle };
