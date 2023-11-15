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
`;

const ReviewIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export { ReviewIcon, ReviewTitle, LeaveReviewPageStyle };
