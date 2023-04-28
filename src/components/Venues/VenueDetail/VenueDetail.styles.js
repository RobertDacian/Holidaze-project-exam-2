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

  .btn {
    @media (min-width: 641px) {
      width: 40%;
    }
  }

  .tabs-wrapper {
    display: flex;
    flex-direction: column;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    gap: 2rem;
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
      /* margin: 15px; */

      &:hover {
        background-color: var(--primary-color-light);
        color: white;
      }
    }
  }

  .tab-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    .info {
      display: flex;
      /* flex-wrap: wrap; */
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      /* width: 100%; */
    }
    width: 100%;
  }
`;
