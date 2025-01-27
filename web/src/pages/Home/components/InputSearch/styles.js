import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;

  input {
    width: 100%;
    background-color: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: ${(props) => props.theme.colors.gray[200]};
    }
  }
`;
