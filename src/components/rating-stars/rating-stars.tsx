type Props = {
  rating: number;
}

export default function RatingStars({rating}: Props): JSX.Element {
  const STARS_COUNT = 5;
  return (
    <>
      {Array.from(Array(STARS_COUNT), (_, index) => (
        <img src={(index < rating) ?
          '/img/sprite/icon-full-star.svg' : '/img/svg/star-disabled.svg'}
        alt="star-rating icon" width="17" height="16" aria-hidden="true" key={index} data-testid="stars"
        />))}
    </>);
}
