// дз №5, Задача №1
// Текстовый чат

let chatOpen = document.querySelector('.chat-widget'); // весь чат
let chatScroll = chatOpen.querySelector('.chat-widget__messages-container'); // окно для прокрутки
let chatInput = document.getElementById('chat-widget__input'); // елемент поля ввода
let counter = 0; // щётчик сообщений бота
let timerID; // айди интервала

// массив с сообщениями бота
const botMessages = [
    '<p>Здравствуйте!</p><p>Могу я вам помочь?</p>',
    'Хотите что-то узнать?',
    'Мы рады, что вы здесь!',
    'Чем именно я могу вам помочь?',
    'У вас есть вопросы?',
    'Что вас интересует?'
]

chatOpen.querySelector('.chat-widget__side').style.cursor = 'pointer'; // курсор мышки при наведении 
chatInput.setAttribute('required', null); // условие поля ввода не должно быть пустым
chatInput.setAttribute('maxlength', 27); // условие поля макс символов 27


chatOpen.addEventListener('click', function(event){ // функция открытие чата по клику
    event.stopPropagation(); //выключает многослойность
    chatOpen.classList.add('chat-widget_active'); // добавляет класс для открытия чата
    downTime(); // запускает функцию простоя
});

window.addEventListener('click', function(event){ // функция закрытия чата по клику за чатом
    event.stopPropagation(); //выключает многослойность
    chatOpen.classList.remove('chat-widget_active'); // удаляет класс для закрытия чата
    clearInterval(timerID); // удаляет интервал простоя
});

function messagesSend(text, classClient) { // функция вывода сообщения в чате
    const messages = document.querySelector( '.chat-widget__messages' ); // сообщения
    let dataTime = new Date().toLocaleTimeString().substring(0, 5); // дата в формате HH:MM в текстовом формате
    
    messages.innerHTML += `
    <div class="message ${classClient}">
    <div class="message__time">${dataTime}</div>
    <div class="message__text">
        ${text}
    </div>
    </div>
    `;

    scrollMessages(); // прокрутка чата
}

function randomInteger(min, max) { // рандом для отправки сообщения, нашёл в инете))
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function botSendMessages() { // функция отправки сообщения ботом
    if (counter === 0) {
        // отправка первого сообщения приветствия
        messagesSend(botMessages[0], 's');
    } else {
        // отправка случайного сообщения кроме первого
        messagesSend(botMessages[randomInteger(1, botMessages.length - 1)], 'bot');
    }
    counter++; // щётчик сообщений, нужен что бы была возможность отправить первое сообщение один раз
}

function scrollMessages() { // функция прокрутки окна
    let bottomMessages = document.querySelector( '.chat-widget__messages' ).getBoundingClientRect().bottom; // низ сообщений
    let bottomChat = chatScroll.getBoundingClientRect().bottom; // низ чата
    
    if (bottomMessages > bottomChat) {  // если низ сообщений ниже, чем низ чатa,
        // то ровняет попиксельно низ чата с низом сообщений
        chatScroll.scrollBy(0, bottomMessages - bottomChat + 10);
    }

    // chatScroll.scrollBy(0, 9999999999999);  Этот вариант с прокруткой мне нравиться больше
}

function downTime() { // функция простоя
    clearInterval(timerID); // очищает интервал
    timerID = setInterval(botSendMessages, 30000); // запускает интервал на 30 сек
}

chatInput.addEventListener('keyup', function(event) { // функция по нажатию кнопок в инпуте чата
    let keyCode = event.code; // введёный код клавиши
    
    if ((keyCode === 'Enter' || keyCode === 'NumpadEnter') && chatInput.checkValidity()) {
        messagesSend(chatInput.value, 'message_client') // отправка сообщения пользователя

        chatInput.value = ''; // очищение поля ввода

        botSendMessages(); // получение сообщения от бота
    }
    
    downTime(); // запускает функцию простоя
})