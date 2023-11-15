import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const StyledInput = styled.input.attrs<any>((props) => ({
  type: props.type || 'text',
}))`
  ${(props) => {
    const light = props.theme.colors.light;
    const main = props.theme.colors.main;
    const gray = props.theme.colors.gray;
    const airfont = props.theme.fonts.air;
    return css`
      width: 100%;
      font-family: ${airfont};

      padding: 10px;
      font-size: 16px;
      border-radius: 10px;
      background-color: ${light};
      box-sizing: border-box;

      border: none;
      &::placeholder {
        color: ${gray};
        font-size: 14px;
      }
      &:focus {
        outline: 1px solid ${main};
      }
    `;
  }};
`;
const InfoInput = styled.input.attrs<any>((props) => ({ type: props.type || 'text' }))`
  ${(props) => {
    const type = props.type;

    const white = props.theme.colors.white;
    const gray = props.theme.colors.gray;
    const black = props.theme.colors.black;
    const fontSize = '20px';
    const font = type === 'password' ? (props.value !== '' ? 'none' : props.theme.fonts.bold) : props.theme.fonts.bold;
    return css`
      width: 100%;
      margin-top: 10px;
      height: 30px;
      padding-bottom: 5px;
      font-size: ${fontSize};
      background-color: ${white};
      box-sizing: border-box;
      font-family: ${font};
      border: none;
      border-bottom: 1px solid ${black};
      &::placeholder {
        color: ${gray};
        font-size: ${fontSize};
      }
      &:focus {
        outline: none;
      }
    `;
  }};
`;

const InfoLabel = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      box-sizing: border-box;
      border: none;
      font-size: 16px;
      /* margin-bottom: 16px; */
    `;
  }};
`;

export { InputContainer, StyledInput, InfoInput, InfoLabel };
