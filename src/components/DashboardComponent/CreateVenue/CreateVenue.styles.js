import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--light-shadow);
  @media (max-width: 639px) {
    padding: 0.5rem;
    width: 100%;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
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
    padding: 0.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  width: 100%;

  &.numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 639px) {
      flex-direction: column;
      width: 100%;
    }
  }
  .small {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const Label = styled.label`
  label {
    color: var(--primary-color);
    margin-bottom: 10px !important;
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 0;
  font-size: var(--small-font-size);
  font-family: inherit;
  color: var(--primary-color);
  outline: none;
  /* width: 100%; */
  max-height: 200px;
  overflow: auto;
  resize: vertical;

  &::placeholder {
    color: var(--primary-color-light);
  }

  &:focus {
    border-color: var(--primary-color-light);
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 0;
  font-size: var(--small-font-size);
  color: var(--primary-color);
  outline: none;
  width: 100%;
  height: 40px;

  &::placeholder {
    color: var(--gray-color);
  }

  &:focus {
    border-color: var(--primary-color-light);
  }
`;

export const Button = styled.button`
  border-radius: none !important;
  width: 100%;
`;

export const Select = styled.button`
  border-radius: none !important;
  width: 100%;
`;
