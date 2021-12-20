// дз №8, Задача №2
// Всплывающее окно

let modal = document.getElementById('subscribe-modal'); // получаем элемент subscribe-modal
let modalClose = modal.querySelector('.modal__close'); // получаем элемент modal__close

if (getCookie('modal') != 'true') { // если в куках нет modal=true
    modal.classList.add('modal_active'); // то показываем окно subscribe-modal
}

modalClose.addEventListener('click', function() { // собитие клика (закрытие модальног оокна)
    document.cookie = 'modal=true'; // записываем в куки
    modal.classList.remove('modal_active'); // удаляет класс modal_active 
});

function getCookie(key) { // функция поиска значений в куках
    if (!document.cookie) { // если куков нет
      return null; // то воpвращаем null
    }
    const cookies = document.cookie.split('; '); // делаем массив со значениями
    const cookie = cookies.find((c) => c.startsWith(key + '=')) || ''; // ищем нужный элемент по ключу
    const value = decodeURIComponent(cookie.substring(key.length + 1)); // разделяем ключ от значения
    return (cookie) ? value : null; // возвращаем значение или null
}