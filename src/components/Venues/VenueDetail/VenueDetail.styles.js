import styled from 'styled-components';

// export const VenueDetailsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-gap: 2rem;

//   @media (min-width: 768px) {
//     grid-template-columns: 1fr 1fr;
//   }

//   img {
//     width: 100%;
//     height: 400px;
//     object-fit: cover;
//   }

//   .venue-info {
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//   }

//   h3 {
//     margin: 0;
//   }

//   /* p {
//     font-size: 1rem;
//     margin: 0;
//   } */
//   .rating {
//     margin: 0;
//     color: #ffd700;
//   }

//   .btn {
//     @media (min-width: 641px) {
//       width: 40%;
//     }
//   }

//   .tabs-wrapper {
//     grid-column-end: span 2;
//     display: flex;
//     flex-direction: column;
//   }

//   .tabs {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     margin-top: 1rem;
//     gap: 2rem;
//     button {
//       flex-grow: 1;
//       text-align: center;
//       background: transparent;
//       font-size: 1rem;
//       color: var(--primary-color);
//       padding: 0.5rem;
//       border: 1px solid var(--primary-color-light);
//       cursor: pointer;
//       transition: all 0.3s;
//       /* margin: 15px; */

//       &:hover {
//         background-color: var(--primary-color-light);
//         color: white;
//       }
//     }
//   }

//   .tab-content {
//     display: flex;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 1rem;
//     margin-top: 1rem;
//     .info {
//       display: flex;
//       /* flex-wrap: wrap; */
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: center;
//       /* width: 100%; */
//     }
//     width: 100%;
//   }
// `;

export const VenueDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  @media (max-width: 768px) {
    img,
    .venue-info {
      grid-column-end: span 2;
    }
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .venue-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    margin: 0;
  }

  span,
  .p-bold {
    display: flex;
    -webkit-box-pack: justify;
    flex-direction: column;
    /* gap: 0.4rem; */
    justify-content: center;
    align-items: flex-start;
  }

  label {
    color: var(--primary-color);
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 0;
    font-size: 14px;
    color: var(--primary-color);
    outline: none;
    width: 100%;
    height: 40px;

    &::placeholder {
      color: var(--primary-color-light);
    }

    &:focus {
      border-color: var(--primary-color-light);
    }
  }
  .rating {
    margin: 0;
    color: #ffd700;
  }

  .btn {
    @media (min-width: 641px) {
      width: 40%;
    }
  }

  .tabs-wrapper {
    grid-column-end: span 2;
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
