import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => (justifyContent || 'space-between')};
  align-items: center;
  margin-top: 32px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray[100]};
  padding-bottom: 16px;

  strong {
    font-size: 24px;
    color: #222;
  }

  a {
    color: ${(props) => props.theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${(props) => props.theme.colors.primary.main};
      color: #fff;
    }
  }
`;
