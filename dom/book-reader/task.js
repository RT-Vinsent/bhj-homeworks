// дз №4, Задача №3 
// Онлайн-читалка

let book = document.getElementById('book'); // элемент book

// ниже три массива элементов панели управления шрифта, цвета текста и цвета фона
let bookControls = Array.from(book.querySelectorAll('.font-size'));
let bookControlsColor = Array.from(book.querySelector('.book__control_color').querySelectorAll('.color'));
let bookControlsColorBackground = Array.from(book.querySelector('.book__control_background').querySelectorAll('.color'));

// функция смены активного ярлыка на панели управления и отключение стандартного действия
function controlActiveAndOther(event, arr, index, classActive) {
    event.preventDefault(); // отключение стандартного действия (перехода по ссылке)
    arr.forEach(element => element.classList.remove(classActive)); // удаление класс
    arr[index].classList.add(classActive); // добавление класс
}


// функция обработки классов для изменения шрифта, цвета и фона
function switchAttributes(delOne, delTwo, add) { 
    book.classList.remove(delOne); // удаление класса
    book.classList.remove(delTwo); // удаление класса
    book.classList.add(add); // добавление класса
}

// функция обработки условий для применения функции обработки классов
function ifElse(value, ifOne, ifTwo, ifThree, classOne, classTwo, classThree) {
    if (value === ifOne) {
        switchAttributes(classOne, classTwo, classThree);
    }
    if (value === ifTwo) {
        switchAttributes(classThree, classTwo, classOne);
    } 
    if (value === ifThree) {
        switchAttributes(classThree, classOne, classTwo);
    }
}

for (let i = 0; i < bookControls.length; i++) { // цикл для назначения события на кнопки
    bookControls[i].addEventListener('click', function(event) { // событие клик для размера шрифта
        // вызов функции смены активного ярлыка и тключение стандартного действия
        controlActiveAndOther(event, bookControls, i, 'font-size_active'); 

        let size = bookControls[i].dataset.size; // чтение атрибута для размера шрифта

        // вызов функции изменения размера шрифта
        ifElse(size, 'small', undefined, 'big', 's', 'book_fs-big', 'book_fs-small'); 
    });

    bookControlsColor[i].addEventListener('click', function(event) { // событие клик для цвета шрифта
        // вызов функции смены активного ярлыка и тключение стандартного действия
        controlActiveAndOther(event, bookControlsColor, i, 'color_active'); 

        let textColor = bookControlsColor[i].dataset.textColor; // чтение атрибута для цвета шрифта

        // вызов функции изменения цвета шрифта
        ifElse(textColor, 'black', 'whitesmoke', 'gray', 'book_color-whitesmoke', 'book_color-gray', 'book_color-black');
    });

    bookControlsColorBackground[i].addEventListener('click', function(event) { // событие клик для цвета фона
        // вызов функции смены активного ярлыка и тключение стандартного действия
        controlActiveAndOther(event, bookControlsColorBackground, i, 'color_active'); 

        let bgColor = bookControlsColorBackground[i].dataset.bgColor; // чтение атрибута для цвета фона

        // вызов функции изменения цвета фона
        ifElse(bgColor, 'black', 'white', 'gray', 'book_bg-white', 'book_bg-gray', 'book_bg-black');
    });

}

