// дз №8, Задача №1
// Текстовый редактор

// Добавляем кнопку Очистить текст ----------
let card = document.querySelector('.card'); // ищем куда вставить кнопку
card.innerHTML += `<button class="btn__clear">Очистить текст</button>`; // Добавляем кнопку в DOM
let btnClear = document.querySelector('.btn__clear'); // кнопка btnClear
// ----------

let editor = document.getElementById('editor'); // окно ввода
let textLocalStorage = JSON.parse(localStorage.getItem("editorText")); // парсим editorText из localStorage

// если есть локальное хранилище, то заполняется окно с текстом
if (textLocalStorage != null) {editor.value = textLocalStorage};

editor.addEventListener('input', function() { // события ввода текста в окно
    localStorage.setItem('editorText', JSON.stringify(editor.value)); // записывает текст в localStorage
})

btnClear.addEventListener('click', function() { // событие клика по кнопке
    editor.value = ''; // очищаем поле текста
    localStorage.removeItem('editorText'); // удаляем editorText из localStorage
})