// ДЗ №2, Задача №1
// Всплывающие окна

let modalMain = document.getElementById('modal_main'); // получаем элемент #modal_main
let modalSuccess = document.getElementById('modal_success'); // получаем элемент #modal_success
let modalClose = document.getElementsByClassName('modal__close'); // получаем псевдо массив modal__close
let showSuccess = document.querySelector('.show-success'); // получаем элемент .show-success

modalMain.classList.add('modal_active'); // В момент запуска скрипта, показывает окно #modal_main

function modalCloseFunc() { // функция для закрытия окна
    modalMain.classList.remove('modal_active'); // удаляет класс modal_active
    modalSuccess.classList.remove('modal_active'); // удаляет класс modal_active
}

for (let i = 0; i < modalClose.length; i += 1) { // цикл для перебора псевдо массива
    modalClose[i].addEventListener('click', modalCloseFunc); // назначаем функцию закрития окна на клик
}

showSuccess.onclick = function() { // функция для клика по элементу с классом show-success
    modalSuccess.classList.add('modal_active'); //По клику на show-success открытие #modal_success
}
