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

const CategoryItem = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    let bgcolor = props.$selected ? props.theme.colors.main : props.theme.colors.white;
    bgcolor = props.$islight == 'light' ? props.theme.colors.light : bgcolor;
    return css`
      display: flex;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 10px;
      flex-direction: column;
      justify-content: space-around;
      background-color: ${bgcolor};
      cursor: pointer;
    `;
  }};
`;

const CategoryImage = styled.img`
  width: 35px;
  height: 35px;
`;

const CategoryName = styled.div`
  font-size: 14px;
`;

const WishBody = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export { WishBody, CategoryImage, CategoryItem, CategoryName, WishListContainer, TitleBox };
