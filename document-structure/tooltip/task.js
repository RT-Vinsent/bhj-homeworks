// дз №6, Задача №1
// Всплывающая подсказка

let hasTooltipArr = Array.from(document.querySelectorAll('.has-tooltip')); // архив c элемонтами сылок
let positionArr = ['top', 'left', 'right', 'bottom']; // массив с позициями 

function addTooltip(index) { // функция добавления подсказки в ссылку
    let div = document.createElement('div');
    div.classList.add('tooltip');
    div.innerText = hasTooltipArr[index].title;
    hasTooltipArr[index].appendChild(div);
}

/*  Функция addDataset
    Если элемент прижат к левой стороне,  то подсказка left отобразиться за экраном.
    Аналогично и другие стороны, поэтому эта функция для теста наверное.
*/
function addDataset(index) { // функция задаёт data-position ссылкам рандомную позицию
    random = Math.floor(Math.random() * positionArr.length);
    hasTooltipArr[index].dataset.position = positionArr[random];  
}

function position(index, children) { // функция позиционирования
    let {top, left, right, bottom, height} = hasTooltipArr[index].getBoundingClientRect(); // находим стороны ссылки
    let childrenHeight = children.getBoundingClientRect().height; // находим высоту подсказки
    let childrenWidth = children.getBoundingClientRect().width; // находим ширину подсказки

    // задаём через style позиционирование по условию
    if (hasTooltipArr[index].dataset.position === 'top') { // если датасет top
        children.style = `left: ${left}px; top: ${top - childrenHeight}px`;
    }

    if (hasTooltipArr[index].dataset.position === 'left') { // если датасет left
        children.style = `left: ${left - childrenWidth}px; top: ${top - ((childrenHeight - height) / 2)}px`;
    }

    if (hasTooltipArr[index].dataset.position === 'right') { // если датасет right
        children.style = `left: ${right}px; top: ${top - ((childrenHeight - height) / 2)}px`;
    }

    if (hasTooltipArr[index].dataset.position === 'bottom') { // если датасет bottom
        children.style = `left: ${left}px; top: ${bottom}px`;
    }
}

for (let i = 0; i < hasTooltipArr.length; i++) { // цикл обхода по сылкам
    addDataset(i) // задаёт data-position ссылкам
    addTooltip(i); // функции добавления подсказки в ссылку

    let children = hasTooltipArr[i].querySelector('.tooltip');  // находим подсказку у ссылки

    hasTooltipArr[i].addEventListener('click', function(evt) { // событие клик по ссылке
        evt.preventDefault(); // отключаем переход по ссылке

        if (children.classList.contains('tooltip_active')) { // если подсказка активна
            children.classList.remove('tooltip_active'); // скрывает подсказку
        } else { // иначе 
            // обход по массиву для выключения активных подсказок (удаления класса)
            hasTooltipArr.forEach(element => element.querySelector('div.tooltip').classList.remove('tooltip_active'));
            children.classList.add('tooltip_active'); // включает подсказку
        }

        position(i, children); // запускат функцию позиционирования подсказки
    });
    
    // привязываем подсказку к элементу при прокрутке стриницы
    window.addEventListener('scroll', function() {
        position(i, children); // запускат функцию позиционирования подсказки при прокрутке страницы
    });
}