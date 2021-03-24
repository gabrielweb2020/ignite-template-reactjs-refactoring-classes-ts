import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';
import LogoImg from '../../assets/logo.svg';

interface HeaderProps {
  openModal: () => void;
}

export function Header ({openModal}: HeaderProps) {
  return (
    <Container>
      <header>
        <img src={LogoImg} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}

