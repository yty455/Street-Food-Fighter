import styled, { css } from 'styled-components';
import { CheckboxType } from './Checkbox.type';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;
const Box = styled.input.attrs<CheckboxType>((props) => ({
  value: props.value,
  name: props.name || props.value,
}))`
  ${(props) => {
    const size = props.size || '21px';

    return css`
      appearance: none;
      border: 1.5px solid gainsboro;
      border-radius: 5px;
      width: ${size};
      height: ${size};

      &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: ${(props) => props.theme.colors.main};
      }
    `;
  }}
`;

const P = styled.p.attrs<CheckboxType>((props) => ({}))`
  ${(props) => {
    const size = props.size || '16px';
    const font = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-size: ${size};
      padding-left: 10px;
      color: ${black};
      font-family: ${font};
    `;
  }}
`;

const TextBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;
export { CheckboxContainer, Box, P, TextBox };
