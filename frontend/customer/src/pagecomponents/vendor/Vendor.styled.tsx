import styled, { css } from 'styled-components';
const TopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;

const VendorName = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;

    return css`
      color: ${black};
      font-size: 24px;
    `;
  }};
`;
export { TopBox, StyledTop, VendorName };
