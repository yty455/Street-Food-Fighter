import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 10px;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 8vh;
`;

const WrapContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;

    return css`
      background-color: ${gray};
      height: 93vh;
      overflow: hidden;
    `;
  }};
`;

const OrderCardWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      background-color: ${white};
      width: 100vw;
      padding: 10px 20px;

      display: flex;
      flex-direction: column;

      gap: 15px;
    `;
  }};
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Topdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const VendorInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const StoreName = styled.div`
  font-size: 24px;
`;

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;

    return css`
      font-family: ${font};
    `;
  }};
`;

export { StoreName, Airfont, Container, WrapContainer, OrderCardWrapper, CardTop, Topdown, VendorInfo };
