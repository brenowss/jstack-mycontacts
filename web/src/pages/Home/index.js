import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer
} from './styles';

import Arrow from '../../assets/images/icons/arrow.svg';
import Edit from '../../assets/images/icons/edit.svg';
import Delete from '../../assets/images/icons/trash.svg';
// import Loader from '../../components/Loader';
// import Modal from '../../components/Modal';

export default function Home() {
  return (
    <Container>
      {/* <Modal danger /> */}

      {/* <Loader /> */}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome" />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={Arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Cicila</strong>
              <small>Tinder</small>
            </div>

            <span>cicila@dilica.com</span>
            <span>(55) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={Edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
