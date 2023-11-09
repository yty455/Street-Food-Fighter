import styled, { css } from 'styled-components';
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 4px solid ${(props) => props.theme.colors.lightgray};
`;

const Tab = styled.button<any>`
  width: 33.33%;
  padding: 16px 0;
  border: none;
  background: none;
  color: ${(props) => props.theme.colors.black};
  font-size: 16px;

  border-left: ${(props) => (props.active == 'true' ? `1px solid ${props.theme.colors.lightgray}` : 'none')};
  border-right: ${(props) => (props.active == 'true' ? `1px solid ${props.theme.colors.lightgray}` : 'none')};
  border-top: ${(props) => (props.active == 'true' ? `2px solid ${props.theme.colors.black}` : 'none')};

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

export { TabContainer, Tab };
