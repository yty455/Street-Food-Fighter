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
  bottom: 70px;
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
export { Day, Curpos, Topbar2, ResearchBox };
