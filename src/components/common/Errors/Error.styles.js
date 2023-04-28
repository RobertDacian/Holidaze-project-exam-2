import styled from 'styled-components';

export const Error = styled.p`
  .error {
    background-color: var(--clr-red-light);
    color: var(--white-color);
    padding: 10px 20px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }

  .warning {
    background-color: var(--clr-yellow-warning);
    color: var(--white-color);
    padding: 10px 20px;
    margin-top: 20px;
    text-align: center;
  }

  .success {
    background-color: var(--clr-green-light);
    color: var(--white-color);
    padding: 10px 20px;
    margin-top: 20px;
    text-align: center;
  }
`;
