import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh !important;
  @media (max-width: 768px) {
    height: 100vh;
  }
`;
