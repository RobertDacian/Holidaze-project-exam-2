import styled from 'styled-components';

export const VenuesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
  padding: 1rem 0;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const VenueCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white-color);
  border-radius: 5px;
  padding: var(--card-padding);
  box-shadow: var(--light-shadow);
  .card-img {
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

// export const MdImage = styled.div`
//   background: red;
// `;
