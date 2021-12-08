// ДЗ №2, Задача №2
// Навигационное меню

// снизу три строки кода для задачи со звёздочкой, редактируем HTML и добавляем второе меню
let body = document.querySelector('body');
let taskTwo = document.querySelector('.menu');
body.innerHTML = body.innerHTML + '<br><br><br><br><br><br><br><p style="color: red; text-align: center;">Второе меню для задачи со звёздочкой</p><br><br><br>' + '<ul class="menu menu_main">' + taskTwo.innerHTML + '</ul>';

let menuLink = document.querySelectorAll('.menu__link'); // псевдо массив c .menu__link

for (let i = 0; i < menuLink.length; i += 1) { // 1. цикл для перебора псевдо массива
    let menuItem = menuLink[i].closest('.menu__item'); // находим родителя .menu__item
    let menuSub = menuItem.querySelector('.menu_sub'); // от родителя ищем дочерний элемент .menu_sub

    // ниже две строчки для задачи со звёздочкой
    let menu = menuLink[i].closest('.menu'); // находим родителя .menu
    let menuSubAll = menu.querySelectorAll('.menu_sub'); // от родителя ищем дочерние элементы .menu_sub

    if (menuSub) { // 2. условие, если есть дочерний элемент .menu_sub
        menuLink[i].onclick = function() { // назначаем функцию на клик .menu__link
            if (!menuSub.classList.contains('menu_active')) { 
                // ниже строчка для задачи со звёдочкой, удаляем у всего меню класс menu_active
                menuSubAll.forEach(element => element.classList.remove('menu_active'));
                menuSub.classList.add('menu_active'); // добавлят класс menu_active при клике, если его нет
            } else {
                menuSub.classList.remove('menu_active'); // удаляет класс menu_active при клике, если он есть
            }

            return false // 3. запрещаем переход по ссылке при клике, если есть дочерний элемент .menu_sub
        }
    }
}