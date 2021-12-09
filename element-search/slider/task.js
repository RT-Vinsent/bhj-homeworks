// ДЗ №2, Задача №3
// Слайдер

let leftClick = document.querySelector('.slider__arrow_prev'); // получаем элемент влево
let rightClick = document.querySelector('.slider__arrow_next'); // получаем элемент вправо

let slidersDot = document.querySelectorAll('.slider__dot'); // получаем псевдо массив кнопок

let sliders = document.querySelectorAll('.slider__item'); // получаем псевдо массив слайдов

let sliderNumber = 0; // создаём нумерацию слайда с 0
slidersDot[sliderNumber].classList.add('slider__dot_active'); // подсвечиваем нужную кнопку

leftClick.onclick = function() { // клик влево
    if (sliderNumber === 0) { // условие для переброса
        sliderNumber = (sliders.length - 1); // переброса с нуля на последний
    } else {
        sliderNumber -= 1; // уменьшаем номер слайда, при клике влево
    }
    sliders.forEach(element => element.classList.remove('slider__item_active')); //удаляем везде класс слайда
    sliders[sliderNumber].classList.add('slider__item_active'); // присваиваем класс нужному слайду

    slidersDot.forEach(element => element.classList.remove('slider__dot_active')); //удаляем везде класс кнопки
    slidersDot[sliderNumber].classList.add('slider__dot_active'); // присваиваем класс нужной кнопке
}

rightClick.onclick = function() { // клик вправо
    if (sliderNumber === (sliders.length - 1)) { // условие для переброса
        sliderNumber = 0; // переброса с последнего на нулевой
    } else {
        sliderNumber += 1; // увеличиваем номер слайда, при клике вправо
    }
    sliders.forEach(element => element.classList.remove('slider__item_active')); //удаляем везде класс слайда
    sliders[sliderNumber].classList.add('slider__item_active'); // присваиваем класс нужному слайду

    slidersDot.forEach(element => element.classList.remove('slider__dot_active')); //удаляем везде класс кнопки
    slidersDot[sliderNumber].classList.add('slider__dot_active'); // присваиваем класс нужной кнопке
}

for (let i = 0; i < slidersDot.length; i++) { // цикл для назначения клика на каждую кнопку
    slidersDot[i].onclick = function() { // клик на кнопку
        sliders.forEach(element => element.classList.remove('slider__item_active')); //удаляем везде класс слайда
        sliders[i].classList.add('slider__item_active'); // присваиваем класс нужному слайду

        slidersDot.forEach(element => element.classList.remove('slider__dot_active')); //удаляем везде класс кнопки
        slidersDot[i].classList.add('slider__dot_active'); // присваиваем класс нужной кнопке

        sliderNumber = i; // присваиваем нужный номер слайда
    }
}