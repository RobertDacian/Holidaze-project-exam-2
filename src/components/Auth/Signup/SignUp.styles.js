import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 0.5rem;
  margin: 1rem;
  box-shadow: var(--light-shadow);

  .tabs {
    display: flex;

    button {
      background-color: transparent;
      border: none;
      color: var(--primary-color);
      font-weight: bold;
      padding: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: var(--primary-color-light);
      }

      &.active {
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }

  form {
    width: 100%;
    padding: 1rem;

    h4 {
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      label {
        color: var(--primary-color);
        margin-bottom: 5px;
      }

      input {
        padding: 10px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        font-size: 14px;
        color: var(--primary-color);
        outline: none;

        &::placeholder {
          color: var(--primary-color-light);
        }

        &:focus {
          border-color: var(--primary-color-light);
        }
      }
    }

    button {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--primary-color-light);
      }
    }
  }

  .error {
    background-color: var(--clr-red-light);
    color: var(--primary-color);
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
    text-align: center;
  }
`;

export const Title = styled.h1``;
