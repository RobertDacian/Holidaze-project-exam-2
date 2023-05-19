import styled from 'styled-components';

export const Section = styled.section``;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  padding: 1rem 0;
  width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Tabs = styled.div`
  width: 100%;
  .tabs-wrapper {
    grid-column-end: span 2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    gap: 1rem;
    button {
      flex-grow: 1;
      text-align: center;
      background: transparent;
      font-size: 1rem;
      color: var(--primary-color);
      padding: 0.5rem;
      border: 1px solid var(--primary-color-light);
      cursor: pointer;
      transition: all 0.3s;
    }
    .active {
      background: var(--primary-color-light);
      color: white;
    }
    button:hover {
      background-color: var(--primary-color-light);
      color: white;
    }
    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  .tab-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
`;
export const Card = styled.div`
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
