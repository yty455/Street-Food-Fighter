import styled, { css } from 'styled-components';

const Topbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
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
      height: calc(100vh - 140px);
      background-color: ${light};
    `;
  }};
`;
const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
export { Topbar, Title, AlertImage, AlertContainer, AlertList };
