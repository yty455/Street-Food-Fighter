import styled, { css } from 'styled-components';

const Topbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px 0px 20px;
`;
const Title = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding-left: 50px;
`;

const AlertImage = styled.div`
  padding: 10px;
  /* margin-right: 15px; */
`;
const AlertContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;

    return css`
      display: flex;
      flex-direction: column;
      height: calc(100vh - 100px);
      background-color: ${light};
      align-items: center;
      gap: 20px;
      padding-top: 20px;

      overflow-y: auto;
      padding-bottom: 50px;
    `;
  }};
`;

const ShowBeforeAlert = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      padding: 10px 20px;
      background-color: ${white};
      border-radius: 10px;
      font-size: 13px;
    `;
  }};
`;
export { Topbar, Title, AlertImage, AlertContainer, ShowBeforeAlert };
