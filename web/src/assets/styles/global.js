import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    font-size: 16px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: ${(props) => props.theme.colors.background};
  }

  button {
    cursor: pointer;
  }
`;
