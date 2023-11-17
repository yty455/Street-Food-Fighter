import styled, { css } from 'styled-components';

const TabWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const white = props.theme.colors.white;
    const bgcolor = props.isactive === 'true' ? main : white;
    return css`
      /* padding: 10px; */
      border-radius: 10px;
      background-color: ${bgcolor};
      text-align: center;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 17vw;
      height: 17vw;
    `;
  }};
`;

const Date = styled.div`
  font-size: 24px;
`;
const Day = styled.div`
  font-size: 20px;
`;
export { TabWrapper, Date, Day };
