import styled from 'styled-components';

export const FilterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  margin: 2rem;
  box-shadow: var(--light-shadow);
  border-radius: 5px;

  @media (max-width: 640px) {
    form {
      flex-direction: column;
    }
  }

  @media (min-width: 640px) {
    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }

  form {
    width: 100%;

    h4 {
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      width: 100%;

      @media (min-width: 640px) {
        width: calc(33% - 10px);
      }

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
        width: 100%;

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
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 15px;

      &:hover {
        background-color: var(--primary-color-light);
      }
    }
  }
`;
