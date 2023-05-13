import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: center; */
  .form-date {
    display: flex;
    @media (max-width: 639px) {
      flex-direction: column;
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0.5rem 0; */
  width: 100%;
`;

export const Label = styled.label`
  label {
    color: var(--primary-color);
    margin-bottom: 10px !important;
  }
`;

export const Input = styled.input`
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
`;

export const Button = styled.button`
  border-radius: none !important;
  width: 100%;
`;
