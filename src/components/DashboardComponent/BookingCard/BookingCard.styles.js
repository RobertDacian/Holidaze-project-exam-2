import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white-color);
  border-radius: 5px;
  padding: var(--card-padding);
  box-shadow: var(--light-shadow);
  max-width: 600px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--radius);
  }

  .price-maxGuests {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .rating {
    margin: 0.5rem 0;
    color: #ffd700;
  }
`;
