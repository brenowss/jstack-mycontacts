import styled, { css } from 'styled-components';

export default styled.button`
  padding: 0 16px;
  height: 52px;
  border: 0;
  background: ${(props) => props.theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  transition: all 0.2s ease-in;

  &:hover {
    background: ${(props) => props.theme.colors.primary.light};
  }

  &:active {
    background: ${(props) => props.theme.colors.primary.dark};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
