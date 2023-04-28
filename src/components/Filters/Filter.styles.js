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

  @media (max-width: 639px) {
    form {
      flex-direction: column;
      width: 100%;
    }
  }

  @media (min-width: 640px) {
    .form-group {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      margin-bottom: 15px;
    }
  }

  form {
    width: 100%;

    h4 {
      color: var(--primary-color);
      margin-bottom: 20px;
    }

    .location-group,
    .guest-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 15px;

      label {
        color: var(--primary-color);
        margin-bottom: 5px;
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

        &::placeholder {
          color: var(--primary-color-light);
        }

        &:focus {
          border-color: var(--primary-color-light);
        }
      }
    }

    .location-group {
      @media (min-width: 640px) {
        width: 50%;
        margin-right: -1px;
      }
    }

    .guest-group {
      @media (min-width: 640px) {
        width: 30%;
        margin-right: -1px;
      }
    }

    button {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      padding: 10px 20px;
      margin-bottom: 15px;
      border: none;
      border-radius: 0;
      cursor: pointer;
      transition: all 0.3s;
      height: 40px;

      &:hover {
        background-color: var(--primary-color-light);
      }
    }

    button[type='submit'] {
      @media (min-width: 640px) {
        width: calc(20% - 10px);
      }
    }
  }

  .clear-filter-group {
    display: flex;
    justify-content: center;
    width: 100%;
    .btn {
      font-family: inherit;
      background-color: transparent;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      text-decoration: underline;
      padding: 0;
    }
  }

  @media (max-width: 639px) {
    button {
      width: 100%;
    }
  }
`;
