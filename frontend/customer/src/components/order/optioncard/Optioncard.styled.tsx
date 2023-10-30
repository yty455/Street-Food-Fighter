import styled, { css } from 'styled-components';

const OptionList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: ${white};
      border-top: 2px solid ${lightgray};
    `;
  }};
`;

const OptionBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: column;
      padding: 20px 25px;
      background-color: ${white};
      gap: 16px;

      border-top: 2px solid ${lightgray};
    `;
  }};
`;

const CountBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.lightgray;

    return css`
      display: flex;
      flex-direction: row;
      padding: 20px 25px;
      background-color: ${white};
      gap: 16px;
      justify-content: space-between;
      border-top: 2px solid ${lightgray};
    `;
  }};
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
`;

const Quantity = styled.div`
  display: block;
  width: 15px;
  text-align: center;
`;
export { OptionBox, Quantity, Title, Content, RowBox, OptionList, CountBox };
