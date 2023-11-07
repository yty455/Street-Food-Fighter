import styled, { css } from 'styled-components';

const TimePickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TimePickerInput = styled.input.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    const font = props.theme.fonts.air;
    return css`
      border: 1px solid ${lightgray};
      border-radius: 5px;
      height: 30px;
      width: 120px;

      &&::-webkit-datetime-edit {
        text-align: center;
        font-size: 18px;
        font-family: ${font};
      }

      &:focus {
        outline: none;
      }
    `;
  }};
`;

const Label = styled.label`
  padding-top: 6px;
`;

export { TimePickerContainer, TimePickerInput, Label };
