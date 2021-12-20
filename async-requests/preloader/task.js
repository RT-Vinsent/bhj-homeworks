// дз №7, Задача №1
// Анимация загрузки данных

let loader = document.getElementById('loader'); // объект анимации закрузки
let items = document.getElementById('items'); // объект куда будут вставляться курсы валют
let localValute = JSON.parse(localStorage.getItem("valute")); // парсим valute из localStorage

const url = 'https://netology-slow-rest.herokuapp.com'; // ссылка
const xhr = new XMLHttpRequest(); // создаём объект

if (localValute != null) { // если в localStorage есть localValute  
    loader.classList.remove('loader_active'); // выключает индикатор загрузки
    for (let prop in localValute) { // обход свойств объекта localValute
        htmlAdd(localValute[prop]); // функция принимает объект, делает разметку и вставляет в DOM
    }
};

xhr.addEventListener('readystatechange', () => { // событие readystatechange
	if (xhr.readyState === xhr.DONE) { // если готово
        loader.classList.remove('loader_active'); // выключает индикатор загрузки

        let valute = JSON.parse(xhr.responseText).response.Valute; // ответа сервера

        localStorage.setItem('valute', JSON.stringify(valute)); // записываем valute в localStorage
        
        items.innerHTML = ''; // очищаем страницу от курсов валют

        for (let prop in valute) { // обход свойств объекта valute
            htmlAdd(valute[prop]); // функция принимает объект, делает разметку и вставляет в DOM
        }
	}
})

xhr.open('get', url); // создаём запрос
xhr.send(); // отправляем запрос 

function htmlAdd(value) { // функция принимает объект, делает разметку и вставляет в DOM
    let html = `
    <div class="item">
        <div class="item__code">
            ${value.CharCode}
        </div>
        <div class="item__value">
            ${value.Value}
        </div>
        <div class="item__currency">
            руб.
        </div>
    </div>
    `;
    items.insertAdjacentHTML('afterBegin', html); // добавляем html разметку в DOM
}