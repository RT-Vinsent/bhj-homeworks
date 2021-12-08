// ДЗ №2, Задача №1
// Всплывающие окна

// Пункт 1 - В момент запуска скрипта, покажите окно #modal_main
let modalMain = document.getElementById('modal_main'); // получаем элемент #modal_main
modalMain.classList.add('modal_active'); //добавляем класс при запуске скрипта

// Пункт 2 - Сделайте закрытие активного окна по нажатию на его элемент с классом modal__close
let modalClose = document.getElementsByClassName('modal__close'); // получаем псевдо массив modal__close

function modalCloseFunc() { // функция для закрытия окна
    let modal = document.getElementsByClassName('modal'); // получаем псевдо массив modal
    for (let i = 0; i < modal.length; i += 1) { // цикл для перебора
        if (modal[i].classList.contains('modal_active')) { // условие проверяет наличие класса
            modal[i].classList.remove('modal_active'); // удаляет класс modal_active
        }
    }
}

for (let i = 0; i < modalClose.length; i += 1) { // цикл для перебора псевдо массива
    modalClose[i].addEventListener('click', modalCloseFunc); // назначаем функцию закрития окна на клик
}

// Пункт 3 - По нажатию на элемент с классом show-success покажите окно #modal_success
let modalSuccess = document.getElementById('modal_success'); // получаем элемент #modal_success
let showSuccess = document.getElementsByClassName('show-success'); // получаем псевдо массив show-success

showSuccess[0].onclick = function() { // функция для клика по элементу с классом show-success
    modalSuccess.classList.add('modal_active'); //добавляем класс в #modal_success
}
