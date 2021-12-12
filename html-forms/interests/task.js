// дз №5, Задача №2
// Дерево интересов

let interestCheckArr = Array.from(document.querySelectorAll('.interest__check')); // все чекбоксы

for (let i = 0; i < interestCheckArr.length; i++) { // цикл для обхода по всем чекбоксам
    interestCheckArr[i].addEventListener('change', function() { // функция на изменение чекбокса
        // дочерние чекбоксы
        let daughterCheckbox = interestCheckArr[i].closest('.interest').querySelectorAll('.interests_active .interest__check');
        
        // если поставить галочочку, дочерние все поставятся
        if (interestCheckArr[i].checked) {daughterCheckbox.forEach(element => element.checked = true)}

        // если убрать галочку, дочерние все уберутся
        if (!interestCheckArr[i].checked) {daughterCheckbox.forEach(element => element.checked = false)}

        // поиск родителя interests_active
        let interestsActive = interestCheckArr[i].closest('.interests_active');

        if (interestsActive) { // если родитель interests_active есть
            changeCheckbox(interestsActive) // то выполняем функцию изменения чекбоксов родителя

            // поиск родителя interests_active
            let interestsActiveTwo = interestsActive.closest('.interest').querySelector('label > .interest__check').closest('.interests_active');
            
            if (interestsActiveTwo) { // если родитель interests_active есть
                changeCheckbox(interestsActiveTwo) // то выполняем функцию изменения чекбоксов родителя
            }
        }
    })
}

function changeCheckbox(interestsActive) { // функция изменения чекбоксов родителя
    // чекбокс Родитель
    let parentInterest = interestsActive.closest('.interest');
    let parent = parentInterest.querySelector('label > .interest__check');

    // массив сеседних чекбоксов
    let siblingCheckbox = Array.from(interestsActive.querySelectorAll('.interest__check'));

    let daughterTrueFalseArr = []; // массив для значений чекбокса

    //обход по массиву с записью в другой массив значений чекбокса
    siblingCheckbox.forEach(element => daughterTrueFalseArr.push(element.checked));

    // переменная истина, если все элементы в массиве истины
    let daughterTrue = daughterTrueFalseArr.includes(true); 

    // переменная ложь, если все элементы в массиве ложны
    let daughterFalse = daughterTrueFalseArr.includes(false);

    if (daughterTrue && daughterFalse) { // если галочки и истина и ложь
        parent.indeterminate = true; // ставим тире родителю
        parent.checked = true; // ставим галочку родителю
    }
    if (daughterTrue && !daughterFalse) { // если все галочки истина
        parent.indeterminate = false; // убираем тире у родителя
        parent.checked = true; // ставим галочку родителю
    }
    if (!daughterTrue && daughterFalse) { // если все галочки ложь
        parent.indeterminate = false; // убираем тире у родителя
        parent.checked = false; // убираем галочку у родителя
    }
}