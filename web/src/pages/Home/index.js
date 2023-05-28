import {
  Container, Header, ListContainer, Card, InputSearchContainer
} from './styles';

import Arrow from '../../assets/images/icons/arrow.svg';
import Edit from '../../assets/images/icons/edit.svg';
import Delete from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome" />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <a href="/">Novo contato</a>
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
            <a href="/">
              <img src={Edit} alt="Edit" />
            </a>
            <button type="button">
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        </Card>
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
            <a href="/">
              <img src={Edit} alt="Edit" />
            </a>
            <button type="button">
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        </Card>
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
            <a href="/">
              <img src={Edit} alt="Edit" />
            </a>
            <button type="button">
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
