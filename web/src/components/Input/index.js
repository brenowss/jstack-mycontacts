import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border: 2px solid transparent;
  outline: 0;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color .2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary.main};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.gray[100]};
    cursor: not-allowed;
    border-color: ${(props) => props.theme.colors.gray[100]};
  }

  ${(props) => props.error && css`
    border-color: ${props.theme.colors.danger.main} !important;
    color: ${props.theme.colors.danger.main} !important;

    &::placeholder {
      color: ${props.theme.colors.danger.main} !important;
    }
  `}
`;
