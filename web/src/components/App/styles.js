import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 30px;
  background: ${(props) => props.theme.colors.background};
`;
