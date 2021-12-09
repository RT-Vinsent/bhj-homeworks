// ДЗ №3, Задача №1
// Выпадающие списки

let dropdownList = document.querySelector('.dropdown__list'); // елемент .dropdown__list
let dropdownValue = document.querySelector('.dropdown__value'); // елемент .dropdown__value
let dropdownLink = document.querySelectorAll('.dropdown__link'); // псевдо массив элементов .dropdown__link
let dropdownLinkArr = Array.from(dropdownLink); // преобразование в массив

dropdownValue.addEventListener('click', function() { // функция клик на кнопку открывает и закрывает список
    if (!dropdownList.classList.contains('dropdown__list_active')) {
        dropdownList.classList.add('dropdown__list_active'); // если класса нет, добавляет класс
    } else {
        dropdownList.classList.remove('dropdown__list_active'); // иначе удаляет класс
    }
})

for (let i = 0; i < dropdownLinkArr.length; i++) { // цикл для обхода по ссылкам списка
    dropdownLinkArr[i].addEventListener('click', function(event) { // функции клика на каждую ссылку
        event.preventDefault(); // запрещает дефолтное действие
        dropdownValue.innerText = this.innerText; // заменяет текст кнопки на текст ссылки
        dropdownList.classList.remove('dropdown__list_active'); // удаляет класс (закрывает список)
    })
}