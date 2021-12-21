// дз №8, Задача №3
// Авторизация

let signin = document.getElementById('signin'); // блок входа
let form = document.getElementById('signin__form'); // форма отправки
let welcome = document.getElementById('welcome'); // блок приветствия
let userId = document.getElementById('user_id'); // userId
let localUserId = JSON.parse(localStorage.getItem("userId")); // парсим userId из localStorage

if (localUserId != null) { // если в localStorage есть userId
    authorization(localUserId); // то функция авторизации
}

form.addEventListener('submit', function(evt) { // событие сабмит формы
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/auth.php", true); // создаём запрос
    xhr.send(formData); // отправляем запрос
    
    xhr.addEventListener('readystatechange', () => { // событие readystatechange
        if (xhr.readyState === xhr.DONE) { // если готово
            let auth = JSON.parse(xhr.responseText); // ответа сервера

            if (auth.success) { // если авторизация успешна, то
                localStorage.setItem('userId', JSON.stringify(auth.user_id)); // записываем user_id в localStorage
                authorization(auth.user_id); // функция авторизации
            } else { // иначе
                let value = document.querySelectorAll('.control'); // находим поля ввода
                value.forEach(element => element.value = ''); // очищаем поля ввода
                alert('Неверный логин/пароль'); // выводим сообщение об ошибки
            }
        }
    })
    evt.preventDefault(); // отключаем стандартное действие сабмита
});

function authorization(id) { // функция авторизации
    signin.classList.toggle('signin_active'); // форму авторизации
    welcome.classList.toggle('welcome_active'); // блок приветствия
    userId.innerText = id; // айди пользователя в блок приветствия
    
    // добавляем кнопку деавторизации
    let signOut = document.getElementById('sign__out'); // sign__out

    if (signOut) { // если кнопка деавторизации есть
        signOut.remove(); // удаляем кнопку деавторизации
        localStorage.removeItem('userId'); // удаляем userId из localStorage
    } else { // если кнпоки нет, то добавляем её
        welcome.insertAdjacentHTML('afterEnd', '<button id="sign__out" style="margin: 10px auto 0;">Выйти</button>');
        signOut = document.getElementById('sign__out'); // находим кнопку sign__out
        signOut.addEventListener('click', function() { // ставим клик на кнопку
            authorization(''); // запускаем функцию авторизации
        })
    } 
}