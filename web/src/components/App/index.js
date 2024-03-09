import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';
import Header from '../Header';
import Routes from '../../Routes';
import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />

        <Container>
          <Header />

          <Routes />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
