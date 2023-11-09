import styled, { css } from 'styled-components';
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 4px solid ${(props) => props.theme.colors.lightgray};
`;

const Tab = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const black = props.theme.colors.black;
    const lightgray = props.theme.colors.lightgray;

    const bleft = props.active === 'true' ? `1px solid ${lightgray}` : 'none';
    const bright = props.active === 'true' ? `1px solid ${lightgray}` : 'none';
    const btop = props.active === 'true' ? `2px solid ${black}` : 'none';

    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      width: 33.33%;
      padding: 10px 0;
      border: none;
      background: none;

      font-size: 18px;

      border-left: ${bleft};
      border-right: ${bright};

      border-top: ${btop};

      &:first-child {
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }

      &:focus {
        outline: none;
      }
    `;
  }};
`;

export { TabContainer, Tab };
