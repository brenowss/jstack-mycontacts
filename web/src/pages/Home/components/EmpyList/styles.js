import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  p  {
    color: ${(props) => props.theme.colors.gray[200]};
    text-align: center;
    margin-top: 8px;

    strong {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }

  img {
    width: 100%;
    max-width: 110px;
  }
`;
