import styled from 'styled-components';

export const VenueDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .venue-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;
