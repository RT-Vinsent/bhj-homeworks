// ДЗ №2, Задача №3
// Слайдер

let leftClick = document.querySelector('.slider__arrow_prev'); // получаем элемент влево
let rightClick = document.querySelector('.slider__arrow_next'); // получаем элемент вправо

let slidersDot = document.querySelectorAll('.slider__dot'); // получаем псевдо массив кнопок
let sliders = document.querySelectorAll('.slider__item'); // получаем псевдо массив слайдов

let slidersDotArr = Array.from(slidersDot); // не знаю нужно ли это преобразование в массив
let slidersArr = Array.from(sliders); // не знаю нужно ли это преобразование в массив

let sliderNumber = 0; // создаём нумерацию слайда с 0
slidersDotArr[sliderNumber].classList.add('slider__dot_active'); // подсвечиваем нужную кнопку

function sliderActive(number) { // функция переключающая слайд и кнопку
    slidersArr.forEach(element => element.classList.remove('slider__item_active')); //удаляем везде класс слайда
    slidersArr[number].classList.add('slider__item_active'); // присваиваем класс нужному слайду

    slidersDotArr.forEach(element => element.classList.remove('slider__dot_active')); //удаляем везде класс кнопки
    slidersDotArr[number].classList.add('slider__dot_active'); // присваиваем класс нужной кнопке
} 

leftClick.onclick = function() { // клик влево
    if (sliderNumber === 0) { // условие для переброса
        sliderNumber = (slidersArr.length - 1); // переброса с нуля на последний
    } else {
        sliderNumber -= 1; // уменьшаем номер слайда, при клике влево
    }
    sliderActive(sliderNumber);
}

rightClick.onclick = function() { // клик вправо
    if (sliderNumber === (slidersArr.length - 1)) { // условие для переброса
        sliderNumber = 0; // переброса с последнего на нулевой
    } else {
        sliderNumber += 1; // увеличиваем номер слайда, при клике вправо
    }
    sliderActive(sliderNumber);
}

for (let i = 0; i < slidersDotArr.length; i++) { // цикл для назначения клика на каждую кнопку
    slidersDotArr[i].onclick = function() { // клик на кнопку
        sliderActive(i);

        sliderNumber = i; // присваиваем нужный номер слайда
    }
}