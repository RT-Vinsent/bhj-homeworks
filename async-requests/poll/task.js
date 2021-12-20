// дз №7, Задача №2
// Опрос с выбором результатов

let pollTitle = document.getElementById('poll__title');
let pollAnswers = document.getElementById('poll__answers');
let body = document.querySelector('body');
const xhrGet = new XMLHttpRequest(); // создаём объект

xhrGet.addEventListener('readystatechange', () => { // событие readystatechange
	if (xhrGet.readyState === xhrGet.DONE && xhrGet.status == 200) { // если DONE
        let survey = JSON.parse(xhrGet.responseText); // текст ответа сервера

        pollTitle.innerText = survey.data.title; // вставляем заголовок вопроса в DOM

        for (let i = 0; i < survey.data.answers.length; i++) { // цикл по массиву ответов
            // вставляет кнопки с ответами в DOM
            pollAnswers.insertAdjacentHTML('beforeEnd', `<button style="margin-right: 3px;" class="poll__answer">${survey.data.answers[i]}</button>`);
            
            let pollAnswer = pollAnswers.querySelectorAll('.poll__answer'); // список вопросов
            pollAnswer[i].addEventListener('click', function() { // событие клик по кнопке
                voiceWindow(i, survey.id, survey.data.answers[i]); // функция запускает модальное окно
            })
        }
	}
})

xhrGet.open('get', 'https://netology-slow-rest.herokuapp.com/poll.php'); // создаём запрос
xhrGet.send(); // отправляем запрос 

// ниже 67 строк кода, которые мог заменить простой alert, но alert же для слабаков))
function voiceWindow(index, id, answer) { // запускает модальное окно
    let modal = document.createElement('div'); // создаём элемент див обёртка
    modal.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    `; // задаём стили

    let modalContent = document.createElement('div'); // создаём элемент див контент
    modalContent.style = `
        min-width: 300px;
        max-width: 450px;
        height: 130px;
        overflow: auto;
        background: #fff;
        position: relative;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `; // задаём стили

    // вставляем текст в модальное окно и линию
    modalContent.innerHTML = `<div>Спасибо, ваш голос ${answer} засчитан!</div><hr style="margin-top: 22px;" width="90%" color="#ff0000" />`;

    let modalButton = document.createElement('a'); // создаём элемент кнопки закрытия
    modalButton.classList.add('modal__close'); // задаём класс, что бы потом найти
    modalButton.style = `
        margin-top: 5px;
        margin-right: 20px;
        padding: 4px 8px;
        border: 1px;
        border-style: solid;
        align-self: flex-end;
        text-decoration: none;
    `; // задаём стили

    modalButton.href = '#'; // добавляем атрибут href
    modalButton.innerText = "Закрыть"; // вставляем текст в кнопку

    modalContent.innerHTML += modalButton.outerHTML; // вставляем кнопку в див контент
    modal.innerHTML += modalContent.outerHTML; // вставляем кнопку и див контент в обёртку

    body.appendChild(modal) // вставляем модальное окно в DOM

    modalClose(modal, id, index); // функция закрытия модального окна и вывода результата
}

function modalClose(modal, id, index) { // функция закрытия модального окна и вывода результата
    let close = document.querySelector('.modal__close'); // кнопка Закрыть модальное окно
    
    close.addEventListener('click', function(evt) { // событие клик по кнопке Закрыть
        evt.preventDefault(); // отмена стандартного действия

        modal.remove(); // удаления модального окна (типо закрытие)

        const xhrPost = new XMLHttpRequest; // создаём объект

        xhrPost.open( 'POST', 'https://netology-slow-rest.herokuapp.com/poll.php' ); // создаём запрос POST
        xhrPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' ); // задаёт заголовок
        xhrPost.send(`vote=${id}&answer=${index}`); // отправляем запрос с телом
        xhrPost.addEventListener('readystatechange', () => { // событие readystatechange
            if (xhrPost.readyState === xhrPost.DONE && xhrPost.status == 200) { // если готово
                let stat = JSON.parse(xhrPost.responseText).stat; // ответа сервера

                pollAnswers.innerText = ''; // удаляем кнопки с ответами

                // получаем количество голосов, что бы вычеслить потом проценты
                let votesAll = stat.reduce(function(prev, curr) { return prev + curr.votes }, 0);

                for (let i = 0; i < stat.length; i++) { // цикл по массиву статистики
                    let procent = (stat[i].votes / (votesAll / 100)).toFixed(2); // вычисляем процент голосов
                    // вставляет статистикув DOM
                    pollAnswers.insertAdjacentHTML('beforeEnd', `<div>${stat[i].answer}: <b>${procent}%</b></div>`);
                }
                nextAnswer(); // функция Следующий вопрос
            }
        })
    })
}

// и снова 12 строк не нужного кода, сделал для практики.
function nextAnswer() { // функция Следующий вопрос
    // добавляем кнопку nextAnswer в DOM
    pollAnswers.insertAdjacentHTML('beforeEnd', '<button class="next__answer" style="margin-top: 20px;">Следующий вопрос</button>');

    let nextAnswerButton = pollAnswers.querySelector('.next__answer'); // кнопка Следующий вопрос
    nextAnswerButton.addEventListener('click', function() { // событие клика по кнопке Следующий вопрос
        pollTitle.innerHTML = ''; // очищаем заголовок
        pollAnswers.innerHTML = ''; // очищаем блок с вопросами 
        xhrGet.open('get', 'https://netology-slow-rest.herokuapp.com/poll.php'); // создаём запрос get
        xhrGet.send(); // отправляем запрос 
    })
}