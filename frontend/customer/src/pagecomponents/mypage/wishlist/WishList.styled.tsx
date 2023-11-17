import styled, { css } from 'styled-components';

const WishListStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      background-color: ${light};
      align-items: center;
    `;
  }};
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: 93vh;
      background-color: ${light};
      justify-content: center;
      align-items: center;
      gap: 15px;
    `;
  }};
`;

const Topbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 15px;

      font-size: 20px;
    `;
  }};
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  justify-content: center;
  padding-left: 3%;
  padding-right: 3%;
`;

const CategoryItem = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    let bgcolor = props.$selected ? props.theme.colors.main : props.theme.colors.white;
    bgcolor = props.$islight == 'light' ? props.theme.colors.light : bgcolor;
    return css`
      display: flex;
      align-items: center;
      width: 90px;
      height: 90px;
      border-radius: 10px;
      flex-direction: column;
      justify-content: space-around;
      background-color: ${bgcolor};
      cursor: pointer;
    `;
  }};
`;

const CategoryLineContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.selected ? props.theme.colors.main : props.theme.colors.white;

    return css`
      display: flex;
      width: 100%;
    `;
  }};
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
`;

const CategoryName = styled.div`
  font-size: 18px;
`;

const Title = styled.div`
  font-size: 28px;
  padding: 10px;
`;

const CategoryCount = styled.div`
  font-size: 24px;
  padding-bottom: 10px;
`;

export {
  Content,
  CategoryLineContainer,
  CategoryCount,
  Title,
  WishListStyle,
  Topbar,
  CategoriesContainer,
  CategoryImage,
  CategoryItem,
  CategoryName,
};
