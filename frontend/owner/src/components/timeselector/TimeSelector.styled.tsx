import styled, { css } from 'styled-components';

const TimeSelectorBody = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      flex-direction: row;
      width: 100%;
    `;
  }};
`;

const TimeWrapper = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
    `;
  }};
`;

const TimeWrapperBody = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      gap: 5px;
      align-items: center;
    `;
  }};
`;

const TimeInput = styled.input.attrs<any>((props) => ({
  type: 'number',
}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const gray = props.theme.colors.gray;
    const black = props.theme.colors.black;
    const fontSize = '20px';
    return css`
      width: 40px;
      height: 30px;
      margin-top: 10px;
      padding-bottom: 5px;
      font-size: ${fontSize};
      background-color: ${white};
      box-sizing: border-box;
      text-align: center;
      border: none;
      border-bottom: 1px solid ${black};

      &::placeholder {
        color: ${gray};
        font-size: ${fontSize};
      }
      &:focus {
        outline: none;
      }
      display: flex;
      flex-direction: row;
    `;
  }};
`;

const TimeSelectorStyle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      padding-top: 20px;
      padding-bottom: 10px;
    `;
  }};
`;

const TimeSelectorTitle = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      font-size: 16px;
      padding-bottom: 15px;
    `;
  }};
`;

export { TimeSelectorTitle, TimeSelectorStyle, TimeSelectorBody, TimeWrapper, TimeWrapperBody, TimeInput };
