import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const backgroundcolor = props.theme.colors.white;

    return css`
      height: 100vh;
      background-color: ${backgroundcolor};

      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }};
`;

const SettingBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 40px;
  gap: 40px;

  width: 90vw;
  overflow-y: auto;

  padding-bottom: 70px;
`;

const Title = styled.div`
  font-size: 20px;
`;

const TypeBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

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
`;

export { Container, SettingBox, TypeBox, Title, CategoriesContainer, CategoryImage, CategoryName, CategoryItem };
