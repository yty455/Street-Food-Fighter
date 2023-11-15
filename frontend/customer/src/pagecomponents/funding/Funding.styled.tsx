import styled, { css } from 'styled-components';

const Day = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const light = props.theme.colors.light;

    return css`
      display: flex;
      align-items: center;
      justify-content: space-around;

      width: 100px;
      height: 45px;
      background-color: ${black};
      color: ${light};
      border-radius: 0px 10px 10px 0px;
      font-size: 18px;
    `;
  }};
`;
const Curpos = styled.div`
  z-index: 3;
  position: fixed;
  right: 10px;
  bottom: 170px;
`;
const Topbar2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ResearchBox = styled.div`
  padding-right: 40px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;
const CardList = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      position: fixed;
      bottom: 70px;
      z-index: 3;
      display: flex;
      gap: 20px;
      width: 100vw;
      overflow-x: scroll;
      white-space: nowrap;
      flex-direction: row;
    `;
  }};
`;

export { Day, Curpos, Topbar2, ResearchBox, CardList };
