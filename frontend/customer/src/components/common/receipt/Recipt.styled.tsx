import styled, { css } from 'styled-components';

const Table = styled.table`
  width: 100%;
  font-size: 16px;
`;
const LineTr = styled.tr`
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
`;
const TableHead = styled.th.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 5px;
      font-family: ${font};
      font-size: 16px;
    `;
  }};
`;

const CenterTd = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 5px;
      font-family: ${font};
      text-align: center;
    `;
  }};
`;
const PriceTd = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 5px;
      font-family: ${font};
      text-align: right;
    `;
  }};
`;
const OptionNameTd = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 5px 20px;
      font-family: ${font};
    `;
  }};
`;
const MenuNameTd = styled.td.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      padding: 5px;
      font-family: ${font};
    `;
  }};
`;

const TotalPrice = styled.td`
  text-align: right;
  padding: 5px;
`;
export { Table, LineTr, TableHead, CenterTd, OptionNameTd, MenuNameTd, PriceTd, TotalPrice };
