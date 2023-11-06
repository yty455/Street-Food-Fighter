import styled, { css } from 'styled-components';

const ChoiceContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Option = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;
    const main = props.theme.colors.main;

    const bgcolor = props.isselected == 'true' ? main : gray;
    return css`
      width: 50%;
      padding: 15px;
      text-align: center;
      background-color: ${bgcolor};

      font-size: 20px;
    `;
  }};
`;

export { ChoiceContainer, Option };
