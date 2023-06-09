import styled from 'styled-components';

export const UpdateDeleteBookingStyles = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    max-width: 500px;
    width: 90%;
    outline: none;
  }

  .btn-outline-red {
    background-color: transparent !important;
    color: var(--primary-color);
    border: 1px solid var(--clr-red-dark);
    padding: 10px 20px;
    margin-bottom: 15px;
    height: 40px;
    width: 100%;
    &:hover {
      background-color: var(--clr-red-dark) !important;
      color: var(--white-color);
    }
  }

  input {
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 0;
    font-size: 14px;
    color: var(--primary-color);
    outline: none;
    width: 100%;
    height: 40px;
    margin-bottom: 1rem;

    &::placeholder {
      color: var(--primary-color-light);
    }

    &:focus {
      border-color: var(--primary-color-light);
    }
  }

  .btn-close {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    padding: 10px 20px;
    margin-bottom: 15px;
    font-size: 1rem;
    border: none;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.3s;
    height: 40px;
    width: 100%;

    &:hover {
      background-color: var(--primary-color-light);
    }
  }
`;
