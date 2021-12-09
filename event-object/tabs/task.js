// дз №3, Задача №3 
// Управление вкладками

let body = document.querySelector('body'); // страница
let tabs1 = document.getElementById('tabs1'); // меню 1
body.innerHTML = body.innerHTML + '<div class="tabs" id="tabs2">' + tabs1.innerHTML + '</div>'; // добавляем меню 2

tabs1 = document.getElementById('tabs1'); // обновляем значения tabs1 после изменения DOM
let tabs2 = document.getElementById('tabs2'); // меню 2

function changeTab(index) { // функция для назначения на выбранное меню переключения вкладок
    let tabs = Array.from(index.querySelectorAll('.tab')); // массив вкладок
    let tabContent = Array.from(index.querySelectorAll('.tab__content')); // массив контента для вкладок

    for (let i = 0; i < tabs.length; i++) { // цикл для клика
        tabs[i].addEventListener('click', function() { // назначение клика на вкладки
            tabs.forEach(element => element.classList.remove('tab_active')); // удаления класс активной вкладки
            tabContent.forEach(element => element.classList.remove('tab__content_active')); // удаления класса активного контента
    
            tabs[i].classList.add('tab_active'); // добавление активного класса на вкладку
            tabContent[i].classList.add('tab__content_active'); // добавление активного класса на контент
        })
    }
}

changeTab(tabs1); // используем переключение вкладок для меню1
changeTab(tabs2); // используем переключение вкладок для меню2