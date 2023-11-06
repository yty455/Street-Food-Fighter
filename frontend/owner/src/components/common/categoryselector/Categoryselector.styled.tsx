import styled, { css } from 'styled-components';

const CategoryItem = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.selected ? props.theme.colors.main : props.theme.colors.white;

    return css`
      display: flex;
      align-items: center;
      width: 22%;
      height: 80px;
      border-radius: 10px;
      flex-direction: column;
      justify-content: space-around;
      background-color: ${bgcolor};
      cursor: pointer;
    `;
  }};
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
`;

const CategoryName = styled.div`
  font-size: 16px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;

  height: 400px;
`;

export { CategoriesContainer, CategoryImage, CategoryName, CategoryItem };
