// дз №4, Задача №2 
// Ротатор рекламы

// ниже три строчки кода для  редактирования HTML, что бы добавить вторую карточку
let content = document.querySelector('.content');
let card = document.querySelector('.card');
content.innerHTML = content.innerHTML + '<div class="card">' + card.innerHTML + '</div>';
// --------------

let cards = Array.from(document.querySelectorAll('.card')); // массив из всех карточек

function rotatorCardFunc(item) { // функция обработчик карточек
    let rotatorCase = Array.from(cards[item].querySelectorAll('.rotator__case')); //массив фраз карточки
    let timerId; // переменная для айди таймера

    function rotatorFunc() { // функция для интервала
        clearInterval(timerId); // удаление интервала, что бы потом запустить с нужной задержкой
        
        // ниже мы находим индекс активной фразы по родителю и дочернему элементу
        let cardActive = rotatorCase[0].closest('.card');
        let indexActive = rotatorCase.indexOf(cardActive.querySelector('.rotator__case_active'));
        
        let timeSpeed; // переменная для задержки интервала
    
        rotatorCase.forEach(element => element.classList.remove('rotator__case_active')); // очищение класса активной фразы
    
        function rotatorActivFunc(index) { // подфункция  для ... 
            rotatorCase[index].classList.add('rotator__case_active'); // назначения класса
            rotatorCase[index].style.color = rotatorCase[index].dataset.color; // назначения цвета
            timeSpeed = rotatorCase[index].dataset.speed; // и чтения скорости
        }
    
        if ((indexActive + 1) === rotatorCase.length) { // условие для смены фраз
            rotatorActivFunc(0); // если была последняя фраза, то ставится первая
        } else {
            rotatorActivFunc(indexActive + 1); // иначе ставится следующая фраза
        }
    
        timerId = setInterval(rotatorFunc, timeSpeed); // запуск интервала с нужной задержкой
    }
    
    timerId = setInterval(rotatorFunc, 1000); // запуск интервала в 1 раз
}

// цикл перебора карточек с вызовом смены их фраз
// сетИнтервал нужен для наглядности, что бы видеть, что код работает 
for (let i = 0; i < cards.length; i++) { 
    let delay = i * 1000;
    setTimeout(rotatorCardFunc, delay, i)
}
