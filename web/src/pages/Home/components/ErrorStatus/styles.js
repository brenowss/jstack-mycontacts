import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 24px;

  .details {
    strong {
      display: block;
      font-size: 22px;
      color: ${(props) => props.theme.colors.danger.main};
      margin-bottom: 8px;
    }
  }
`;
