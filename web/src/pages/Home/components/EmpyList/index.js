import EmptyBox from '../../../../assets/images/empty-box.svg';
import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <img
        src={EmptyBox}
        alt="Empty box"
      />

      <p>
        Você ainda não possui contatos cadastrados!
        Clique no botão <strong>Novo contato</strong> para adicionar seu primeiro contato.
      </p>
    </Container>
  );
}
