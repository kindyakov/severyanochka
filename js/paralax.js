const particles = document.querySelectorAll('.particles');
if (particles) {
  // Скороть анимации
  const speed = 0.5;
  //  
  let positionX = 0, positionY = 0;
  let coordX = 0, coordY = 0;
  //
  let posScrollY = 0;
  let scrollCoordY = 0;
  //
  function setMousePeralexMouseStyle() {
    let distX = coordX - positionX;
    let distY = coordY - positionY;

    positionX = positionX + (distX * speed);
    positionY = positionY + (distY * speed);
    //Стили
    particles.forEach(el => {
      let coefficient = el.dataset.kef;
      el.style.cssText = `transform: translate(${positionX / coefficient}px, ${(positionY / coefficient) + (posScrollY / coefficient)}px)`
    })
    // requestAnimationFrame(setMousePeralexMouseStyle);
  }

  window.addEventListener('mousemove', function (e) {
    // Ширина высота окна браузера
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Центр координат
    coordX = e.pageX - windowWidth / 2;
    coordY = e.pageY - windowHeight / 2;
    setMousePeralexMouseStyle();
  })
  //

  function setMousePeralexScrollStyle() {
    let scrollDistY = scrollCoordY - posScrollY;

    posScrollY = posScrollY + (scrollDistY * speed)
    //Стили
    particles.forEach(el => {
      let coefficient = el.dataset.kef;
      el.style.cssText = `transform: translate(${positionX / coefficient}px, ${(positionY / coefficient) + (posScrollY / coefficient)}px)`
    })
    // requestAnimationFrame(setMousePeralexScrollStyle);
  }

  window.addEventListener('scroll', function (e) {
    // Высота окна браузера
    const windowHeight = window.innerHeight;
    scrollCoordY = scrollY;
    setMousePeralexScrollStyle()
  })
}
