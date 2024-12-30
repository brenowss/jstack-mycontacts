import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  span {
    color: ${(props) => props.theme.colors.gray[200]};
    word-break: break-word;
  }
`;
