// ДЗ №1, Задача №2 
// Игра-кликер

// Доп задание, добавляем часть кода в HTML
let clicker__status = document.getElementsByClassName('clicker__status');
clicker__status[0].innerHTML = clicker__status[0].innerHTML + '<p>Скорость клика: <span id="clicker__speed">0</span></p>';

// присваиваем объект-узел по ID
let clickerСounterId = document.getElementById('clicker__counter');
let clickerSpeedId = document.getElementById('clicker__speed'); // доп задание
let cookie = document.getElementById('cookie');

// Читаем данные о текущем количестве кликов
let clickerСounter = clickerСounterId.textContent;

// Читаем данные о текущей скорости кликов для доп задания
let clickerSpeed = clickerSpeedId.textContent;

// доп задание
let nextClick = new Date(); // время клика
let intervalClick; // интервал между кликами

// функция для клика
function cookieClick() {
    clickerСounter++;  //считает количество кликов
    clickerСounterId.textContent = clickerСounter; // выводит количество кликов

    // условие изменяет размер печеньки по клику
    if (cookie.width === 200) {
        cookie.width = 170;
    } else {
        cookie.width = 200;
    }

    // Для доп задания. Можно было использовать условие, что бы не считать скорость первого клика
    intervalClick = new Date() - nextClick; // подсчёт интервала между кликом
    clickerSpeedId.textContent = (1 / (intervalClick / 1000)).toFixed(2); // вывод скорости клика
    nextClick = new Date(); // записывает время в переменную
}

// назначается клик на печеньку
cookie.onclick = cookieClick;