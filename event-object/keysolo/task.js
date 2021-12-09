// дз №3, Задача №2 
// Соло на клавиатуре

// ниже две строчки кода для изменения HTML для задачи со звёздочкой
let statusHtml = document.querySelector('.status');
statusHtml.innerHTML = statusHtml.innerHTML + '<p>Таймер обратного отсчёта: <span class="status__timer">0</span></p>';

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer'); // Для задачи со *

    this.reset();

    this.registerEvents();
    this.timer();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  timer() { // Метод таймера для задачи со *
    clearInterval(this.timerID); // Очищаем интервал при вызове метода

    this.keyNum = Array.from(document.querySelectorAll('.symbol')).length; // Ищем длину слова
    this.timerElement.textContent = this.keyNum; // Обновляем таймер на странице
    let savedThis = this; // сохраняем this для использования в функции 

    function timerFunc() { // функция для интервала
      if (savedThis.keyNum != 0) { 
        savedThis.timerElement.textContent = savedThis.keyNum -= 1; // если не = 0, то уменьшает таймер на 1
      } else {
        savedThis.fail(); // запускает метод fail после истечения таймера
        savedThis.timer(); // запускаем метод timer для обновления таймера
      }
    }
    
    this.timerID = setInterval(timerFunc, 1000);
  }

  registerEvents() {
    let savedThis = this; // сохраняем this для использования в функции   

    function keyPressFunc(event) { // функция для события
      let keyText = savedThis.currentSymbol.textContent.toUpperCase(); // буква из слова в верхнем регистре
      let keyPress = event.key.toUpperCase(); // нажатая буква на клавиатуре в верхнем регистре

      if (keyText === keyPress) { // сверка букв
        savedThis.success(); // если буквы совпадают
      } 

      if (keyText != keyPress) {  // сверка букв
        savedThis.fail(); // если буквы не совпадают
        savedThis.timer(); // задача со *. Запускаем метод таймера, после метода из за которого выдалось новое слово
      }
    }

    window.addEventListener('keyup', keyPressFunc); // событие на странице по нажатой клавиши
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.timer(); // задача со *. Запускаем метод таймера, после метода который выдал новое слово
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'я люблю kitkat', // задача со *
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))