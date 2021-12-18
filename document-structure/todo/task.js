// дз №6, Задача №2
// Простой список дел

let taskInput = document.getElementById('task__input'); // поле ввода
let tasksAdd = document.getElementById('tasks__add'); // кнопка добавить задачу
let tasksList = document.getElementById('tasks__list'); // список задач
let localStorageNotes = JSON.parse(localStorage.getItem("notes")); // парсим notes из localStorage

if (localStorageNotes != null) { // если в localStorage есть notes  
    for (let i = 0; i < localStorageNotes.length; i++) { // то цикл по массиву
        htmlNoteAdd(localStorageNotes[i]); // добавляем заметки в DOM из notes
        taskRemoteFunc(); // вызываем функцию которая назначает удаления заметок при клике на крестик
    }
};

function taskRemoteFunc() { // функция назначает удаление заметок при клике на крестик
    let taskRemove = tasksList.querySelectorAll('.task__remove'); // элементы крестика
    
    // taskRemove[0], потому что новая заметка всегда с индексом 0 
    taskRemove[0].addEventListener('click', function(evt) { // клик по крестику
        evt.preventDefault(); // отмена стандартного действия
        
        let task = taskRemove[0].closest('.task'); // родитель крестика
        let taskText = task.querySelector('.task__title').innerText; // текс заметки

        updateLocalStorage(null, taskText); // обновляем localStorage

        task.remove(); // удаление заметки
    })
}

tasksAdd.addEventListener('click', function(evt) { // клик по кнопке
    evt.preventDefault(); // отмена стандартного действия

    if (taskInput.value) { // если инпут не пустой
        htmlNoteAdd(taskInput.value); // добавляем html разметку в DOM
        updateLocalStorage(taskInput.value, null); // обновляем localStorage
        taskRemoteFunc(); // вызываем функцию которая назначает удаления заметок при клике на крестик
        taskInput.value = ''; // очищаем поле ввода
    }
});

function updateLocalStorage(noteAdd, noteDel) { // добавляем заметку в localStorage
    let notes = JSON.parse(localStorage.getItem("notes")); // парсим notes из localStorage

    if (notes != null && noteAdd != null) {notes.push(noteAdd)};  // пушит массив
    if (notes === null && noteAdd != null) {notes = [noteAdd]};  // создаёт массив
    if (notes != null && noteDel != null) {notes.splice(notes.indexOf(noteDel), 1)};  // удаляет заметку из массива

    localStorage.setItem('notes', JSON.stringify(notes)); // перезаписываем notes в localStorage
}

function htmlNoteAdd(note) { // добавляем html разметку в DOM
    let html = `
    <div class="task">
        <div class="task__title">
            ${note}
        </div>
        <a href="#" class="task__remove">&times;</a>
    </div>`;
    tasksList.insertAdjacentHTML('afterBegin', html); // добавляем заметку в начало
}