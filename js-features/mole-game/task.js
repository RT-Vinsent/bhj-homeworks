// ДЗ №1, Задача №3
// Игра «Убей кротов»

// присваиваем объект-узел по ID
let dead = document.getElementById('dead');
let lost = document.getElementById('lost');

// для себя решил добавить защиту от двойного клика
let nextClick = new Date(); // время клика
let intervalClick; // интервал между кликами

// цикл с присваиванием
for (let index = 1; index < 10; index++) {
    // взял из base.js и не понял как это работает
    // getHole = index => document.getElementById(`hole${index}`); 
    // потом привёл в понятный вид, и теперь понимаю почему она работает
    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    // функция клика
    getHole(index).onclick = function() {
        intervalClick = new Date() - nextClick; // подсчёт интервала между кликом

        /* // старое условие для изменения счётчиков
        if (getHole(index).classList.contains('hole_has-mole')) {
            dead.textContent++;
        } else {
            lost.textContent++; 
        }*/

        // условия для изменения счётчиков + условие защиты от двойного клика
        if (getHole(index).className === 'hole' && (intervalClick > 500)) { 
            lost.textContent++; 
        }
        if (getHole(index).className === 'hole hole_has-mole' && (intervalClick > 500)) { 
            dead.textContent++; 
        }

        nextClick = new Date(); // записывает время клика в переменную

        // условие для поражения
        if (lost.textContent === '5') {
            setTimeout(lostAlert, 100) // setTimeout нужен, что бы счётчик успел сработать перед alert
        }

        // условие для победы
        if (dead.textContent === '15') {
            setTimeout(deadAlert, 100) // setTimeout нужен, что бы счётчик успел сработать перед alert
        }
    };
}

// функции вынес  из цикла, так правильнее, зачем 9 раз этот код циклить.

// функция объявления поражения и обнуления счётчиков
function lostAlert() { 
    alert('Вы проиграли!');
    lost.textContent = 0;
    dead.textContent = 0;
}

// функция объявления победы и обнуления счётчиков
function deadAlert() {
    alert('ПОБЕДА!');
    lost.textContent = 0;
    dead.textContent = 0;
}

