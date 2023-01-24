const Rating = () => {
  let ratingActive, ratingValue;
  const cardRating = document.getElementsByClassName('card-rating');
  if (cardRating.length > 0) {
    initRatings();
  }
  function initRatings() {
    for (let i = 0; i < cardRating.length; i++) {
      const ratings = cardRating[i];
      initRating(ratings)
    }
  }
  function initRating(ratings) {
    initRatingVars(ratings)
    setTatingActiveWidth();
  }
  function initRatingVars(ratings) {
    ratingActive = ratings.querySelector('.card-rating__active');
    ratingValue = ratings.querySelector('.card-rating__items');
  }
  function setTatingActiveWidth(index = ratingValue.dataset.rating) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}px`;
  }
}

export default Rating;