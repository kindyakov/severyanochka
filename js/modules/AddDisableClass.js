const AddDisableCardBtn = (arr) => {
  arr.forEach(card => {
    let cardDisable = document.querySelector(`[id="${card}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.add-btn');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
const AddDisableCardLike = (arr) => {
  arr.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.like');
      cardDisableLike.classList.add('disable');
    }
  });
}

export { AddDisableCardBtn, AddDisableCardLike };