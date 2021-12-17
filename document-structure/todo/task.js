// дз №6, Задача №2
// Простой список дел

let taskInput = document.getElementById('task__input'); // поле ввода
let tasksAdd = document.getElementById('tasks__add'); // кнопка добавить задачу
let tasksList = document.getElementById('tasks__list'); // список задач
let keyCount = 0; // счётчик заметок
let myStorage = {}; // объект моего хранилища

// спарсим myStorage из localStorage обратно в объект
let returnMyStorage = JSON.parse(localStorage.getItem("myStorageKey"));

if (returnMyStorage) { // если в localStorage есть моё хранилище  
    myStorage = returnMyStorage; // то Моё хранилище равняется хранилищу в localStorage
    keyCount = localStorage.getItem('keyCount'); // переназнаает keyCount из keyCount в localStorage
}

for (let key in returnMyStorage) { // обход по объекту 
    tasksList.insertAdjacentHTML('afterBegin', returnMyStorage[key]); // вставляем заметку из хранилища в DOM
    taskRemoteFunc(); // вызываем функцию которая назначает удаления заметок при клике на крестик
}

function taskRemoteFunc() { // функция назначает удаление заметок при клике на крестик
    let taskRemove = tasksList.querySelectorAll('.task__remove'); // элементы крестика

    taskRemove[0].addEventListener('click', function(evt) { // клик по крестику
        evt.preventDefault(); // отмена стандартного действия
        
        // taskRemove[0], потому что новая заметка всегда с индексом 0
        let task = taskRemove[0].closest('.task'); // родитель крестика
        let dataKey = task.dataset.key; // dataKey заметки

        task.remove(); // удаление заметки
        delete myStorage[dataKey]; // удаления заметки из хранилища по dataKey

        localStorage.setItem('myStorageKey', JSON.stringify(myStorage)); // обновляем моё хранилище в localStorage
    })
}

tasksAdd.addEventListener('click', function(evt) { // клик по кнопке
    evt.preventDefault(); // отмена стандартного действия

    // присвоение значения инпута и keyCount в разметку, и всё это в переменную
    let html = `
    <div class="task" data-key="${keyCount}">
        <div class="task__title">
            ${taskInput.value}
        </div>
        <a href="#" class="task__remove">&times;</a>
    </div>`

    if (taskInput.value) { // если инпут не пустой
        tasksList.insertAdjacentHTML('afterBegin', html); // добавляем заметку в начало

        myStorage[keyCount] = html; // добавляем заметку в моё хранилище

        localStorage.setItem('myStorageKey', JSON.stringify(myStorage)); // обновляем моё хранилище в localStorage

        taskInput.value = ''; // очищаем поле ввода

        keyCount++; // увеличиваем счётчик заметок
        localStorage.setItem('keyCount', keyCount); // записываем счётчик в localStorage

        taskRemoteFunc(); // вызываем функцию которая назначает удаления заметок при клике на крестик
    }
});