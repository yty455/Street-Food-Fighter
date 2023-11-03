import styled, { css } from 'styled-components';

const BoxContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const gray = props.theme.colors.gray;

    return css`
      display: flex;
      flex-direction: column;
      background-color: ${white};
      align-items: center;
      border-radius: 10px;
      width: 90vw;
      border: 0.5px solid ${gray};
      margin-top: 40px;
    `;
  }};
`;

const ContentBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.gray;

    return css`
      padding: 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 0.5px solid ${gray};

      &:last-child {
        border-bottom: none;
      }
    `;
  }};
`;

const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Content = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const gray = props.theme.colors.gray;
    return css`
      font-family: ${font};
      color: ${gray};
    `;
  }};
`;

const InfoTitle = styled.div`
  font-size: 18px;
`;
export { BoxContainer, ContentBox, Right, Content, InfoTitle };
