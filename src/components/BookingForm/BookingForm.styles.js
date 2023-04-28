import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4d90fe;
    box-shadow: 0 0 0 0.2rem rgba(77, 144, 254, 0.25);
  }
`;

export const Button = styled.button`
  /* padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #4d90fe;
  border: 1px solid #4d90fe;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  &:hover {
    background-color: #357ae8;
    border-color: #357ae8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(77, 144, 254, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  } */
`;
