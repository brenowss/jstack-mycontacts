import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => props.theme.colors.primary.light};
  }

  &:active {
    background: ${(props) => props.theme.colors.primary.dark};
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

  &:disabled {
    background: #ccc !important;
    cursor: not-allowed !important;
  }
`;
