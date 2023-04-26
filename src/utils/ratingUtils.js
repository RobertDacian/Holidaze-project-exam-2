import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

export const calculateRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <>
      {' '}
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}{' '}
      {halfStar ? <FaStarHalf key='half' /> : null}{' '}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}{' '}
    </>
  );
};
