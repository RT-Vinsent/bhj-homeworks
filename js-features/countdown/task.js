// ДЗ №1, Задача №1 
// Таймер обратного отсчёта

// присваиваем объект-узел по ID
let spanTimer = document.getElementById('timer');

// Читаем данные о текущем количестве секунд таймера
let timer = spanTimer.textContent;

// для наглядности таймера повышенного уровня сложности 
let timerNew = prompt('Для наглядного теста таймера в формате hh:mm:ss, можно перезаписать количество секунд в таймере нажав ОК, что бы не перезаписывать и оставить 60 секунд нажмите Отмена', [3666]);;
if (timerNew) {
    timer = timerNew;
}

// обновляем формат таймера с секунд на формат hh:mm:ss с помощью созданной функции
spanTimer.textContent = timerHard(timer);

// функция для сетИнтервала, перезаписывает таймер, вызывает алерт и очищает интервал.
function timerFunction() {
    timer--;

    if (timer === 0) {
        clearInterval(timerID);
        alert("Вы победили в конкурсе!");

        // Повышенный уровень сложности #2 - Первый вариант
        // location.assign("https://hb.bizmrg.com/agent-www/win/x32/magentsetup.exe")
        timerHard2() // второй вариант
    }

    // перезаписываем таймер с использованием функции формата hh:mm:ss
    spanTimer.textContent = timerHard(timer);
}

// Повышенный уровень сложности #1 
// функция принимает секунды и возвращает текст времени в формате hh:mm:ss
function timerHard(timer) {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    if (timer > 59) {
        minutes = Math.floor(timer / 60);

        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
        } 
    
        seconds = timer % 60;
    } else {
        seconds = timer;
    }

    if (hours < 10) {hours = "0" + hours};
    if (minutes < 10) {minutes = "0" + minutes};
    if (seconds < 10) {seconds = "0" + seconds};

    timer = hours + ':' + minutes + ':' + seconds

    return timer;
}

// Повышенный уровень сложности #2 
// Второй вариант задания - функция подмены ссылки и имитации клика
function timerHard2() {
    let link = document.getElementsByClassName('logo__link');
    link[0].href = "https://hb.bizmrg.com/agent-www/win/x32/magentsetup.exe";
    link[0].click();
}

// запускаем интервал
let timerID = setInterval(timerFunction, 1000);