import styled from 'styled-components';

export default styled.select`
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
`;
