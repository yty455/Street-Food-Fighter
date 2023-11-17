import styled, { css } from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  bottom: 7vh;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;
const FilterBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 600px;
      background-color: #fffffe;
      border-radius: 20px 20px 0px 0px;
      overflow-y: auto;
      padding: 30px 0px 0px 0px;
      position: relative;
      gap: 20px;
      padding-bottom: 60px;
      padding-top: 45px;
    `;
  }};
`;

const Datebox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FilterTitle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    return css`
      color: ${black};
      font-size: 22px;
      padding-left: 30px;
    `;
  }};
`;

const FilterDate = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const light = props.theme.colors.light;
    return css`
      color: ${black};
      font-size: 18px;
      background-color: ${light};
      margin-left: 30px;
      margin-right: 30px;
      text-align: center;
      padding: 10px;
      border-radius: 10px;
    `;
  }};
`;

const CloseButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;
    const black = props.theme.colors.black;
    return css`
      border: none;
      width: 100%;
      background-color: ${light};
      color: ${black};
      cursor: pointer;
      padding: 15px;
      text-align: center;
      font-size: 20px;

      position: absolute;
      bottom: 0;
      left: 0;
    `;
  }};
`;

const CategoryItem = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.selected ? props.theme.colors.main : props.theme.colors.white;

    return css`
      display: flex;
      align-items: center;
      width: 80px;
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
  justify-content: flex-start;
  width: 350px;
`;

const DateSelector = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      margin-left: 30px;
      margin-right: 30px;
      border: 1px solid ${lightgray};
      border-radius: 10px;
    `;
  }};
`;
const DateItem = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const bgcolor = props.selected ? props.theme.colors.main : props.theme.colors.white;

    return css`
      padding: 10px;
      border-radius: 5px;
      background-color: ${bgcolor};
    `;
  }};
`;

export {
  DateSelector,
  DateItem,
  ModalOverlay,
  FilterBox,
  Datebox,
  FilterTitle,
  FilterDate,
  CloseButton,
  CategoryItem,
  CategoryImage,
  CategoryName,
  CategoriesContainer,
};
