import styled, { css } from 'styled-components';

const WishListContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      flex-direction: column;
      background-color: ${white};
      align-items: center;
      gap: 20px;
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

export { WishListContainer, TitleBox };
