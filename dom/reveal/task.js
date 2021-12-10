// дз №4, Задача №1 
// Появление элементов при прокрутке

let reveals = Array.from(document.querySelectorAll('.reveal')); //массив элементов для загрузки

window.addEventListener('scroll', function() { // функция прокрутки
    let sizeWindow = window.innerHeight;
    for (let i = 0; i < reveals.length; i++) { // цикл для прохода по массиву
        let topElement = reveals[i].getBoundingClientRect().top; // высота элемента из массива
        let bottomElement = reveals[i].getBoundingClientRect().bottom; // низ элемента из массива
        // условие для загрузки элемента при прокрутке снизу и сверху
        if ((topElement > 0 || (bottomElement > 0 && bottomElement < sizeWindow)) && topElement < sizeWindow && !reveals[i].classList.contains('reveal_active')) {
            reveals[i].classList.add('reveal_active'); // добавление класса для загрузки элемента
            console.log(`элемент №${i + 1} загружен`); // проверка работоспособности условия для себя
        }
    }  
});

