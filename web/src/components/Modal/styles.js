import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.8); }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.1s ease-in;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s;`}
`;

export const Container = styled.div`
  position: absolute;
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${scaleIn} 0.2s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.2s;`}

  & > h1 {
    font-weight: bold;
    font-size: 22px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])};
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;

  .cancel-button {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.gray[200]};
    font-size: 16px;
    transition: all 0.2s ease-in;

    &:hover {
      color: ${(props) => props.theme.colors.primary.dark};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
