import styled from 'styled-components';

export const Error = styled.div`
  .error {
    background-color: var(--clr-red-light);
    color: var(--primary-color);
    padding: 10px;
    border-radius: var(--radius);
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }

  .warning {
    background-color: var(--clr-yellow-warning);
    color: var(--primary-color);
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
    text-align: center;
  }

  .success {
    background-color: var(--clr-green-light);
    color: var(--primary-color);
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
    text-align: center;
  }
`;
