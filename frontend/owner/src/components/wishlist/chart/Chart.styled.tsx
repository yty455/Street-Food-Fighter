import styled, { css } from 'styled-components';

const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100px;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
`;

const CountBox = styled.div`
  width: calc(100vw - 160px);
  font-size: 18px;
  text-align: center;

  display: flex;
`;

const FoodName = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const air = props.theme.fonts.air;
    return css`
      font-family: ${air};
      font-size: 18px;
    `;
  }};
`;

const Bar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const flexGrow = props.flexgrow;
    return css`
      flex-grow: ${flexGrow};

      background-color: ${main};
      height: 25px;

      display: flex;
      border-radius: 0px 10px 10px 0px;
      align-items: center;
    `;
  }};
`;

const Count = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const air = props.theme.fonts.air;
    return css`
      font-family: ${air};
      padding: 0px 5px;
    `;
  }};
`;
export { NameBox, CategoryBox, CountBox, FoodName, Bar, Count };
