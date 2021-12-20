// дз №7, Задача №3
// Загрузка больших файлов

const progress = document.getElementById('progress'); //  статус загрузки
let form = document.getElementById('form'); // форма отправки

form.addEventListener('submit', function(evt) { // событием сабмит формы
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function(event) { // событие загрузки отправки файла
        progress.value = event.loaded / event.total; // изменение статуса загрузки
    }
    
    // я не понимаю, почему мы получаем файл который весит более 100 мегабайт ?
    xhr.onprogress = function(event) { // событие загрузки для получения файла
        console.log( 'Получено с сервера ' + ((event.loaded / 1024) / 1024).toFixed(2) + ' МБ из ' + event.total );
    }

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php", true);  // создаём запрос
    xhr.send(formData); // отправляем запрос
    
    evt.preventDefault(); // отключаем стандартное действие сабмита
});