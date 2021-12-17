// дз №6, Задача №3
// Корзина товаров

let cart = document.querySelector('.cart'); // корзина
let cartProducts = document.querySelector('.cart__products'); // продукты корзины
let product = Array.from(document.querySelectorAll('.product')); // элементы товаров
let keyCount = 0; // счётчикКлюч товаров в корзине
let myStorage = {}; // объект моего хранилища

// спарсим myStorage из localStorage обратно в объект
let returnMyStorage = JSON.parse(localStorage.getItem("myStorageKeyCart"));

if (returnMyStorage) { // если в localStorage есть моё хранилище  
    myStorage = returnMyStorage; // то Моё хранилище равняется хранилищу в localStorage
    keyCount = localStorage.getItem('keyCountCart'); // переназнаает keyCount из keyCountCart в localStorage
}

for (let key in returnMyStorage) { // обход по объекту 
    cartProducts.insertAdjacentHTML('afterBegin', returnMyStorage[key]); // вставляем продукт корзины из хранилища в DOM
    cartProductRemote() // вызываем функцию которая назначает удаления пррдукта из корзины при клике на него
}

if (cartProducts.querySelectorAll('.cart__product').length === 0) {
    cart.style.display = 'none'; // если товаров в корзине нету, она скрывается
}

for (let i = 0; i < product.length; i++) { // цикл по поналеям продуктов
    let minus = product[i].querySelector('.product__quantity-control_dec'); // кнопка минус
    let plus = product[i].querySelector('.product__quantity-control_inc'); // кнопка плюс
    let value = product[i].querySelector('.product__quantity-value'); // элемент кол-ва товара
    let productAdd = product[i].querySelector('.product__add'); // кнопка добавить товар

    let valueText = value.innerText; // количество товара
    let valueImg = product[i].querySelector('.product__image'); // картинка товара
    let img = valueImg.src; // ссылка картинки
    let productId = product[i].dataset.id; // айди товара

    minus.addEventListener('click', function() { // клик по минусу
        //let valueText = value.innerText; // количество товара
        if (valueText > 1) { // если кол-во тавара больше 1
            valueText--; // минусуем на 1  кол-во товара
            value.innerText = valueText; // изменяем количество товара в DOM
        }
    });

    plus.addEventListener('click', function() { // клик по плюсу
        //let valueText = value.innerText; // количество товара
        valueText++; // увеличиваем на 1 кол-во товара
        value.innerText = valueText; // изменяем количество товара в DOM
    });

    productAdd.addEventListener('click', function() { // клик по кнопке добавить в корзину
        if (cart.style.display === 'none') {
            cart.style.display = 'block';
        }

        // ищем элемент в карзине с сетАйди элеманта в товаре по которому кликнули
        let productCart = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

        if (productCart) { // если элемент в корзине уже есть, то обновляем кол-во товара
            let cartProductCount = productCart.querySelector('.cart__product-count'); // элемент кол-ва
            let count = +cartProductCount.innerText; // считываем кол-во этого товара в корзине
            let oldKey = productCart.dataset.key;
           
            cartProductCount.innerText = +valueText + count; // добавляем новое кол-во товара в корзину
            
            cartImgAnimation(valueImg, img, productId); // анимация картинки
            updateMyStorage(oldKey, productCart.outerHTML) // функция обновляет моё хранилище

        } else { // если товара в корзине нет, то добавляем его
            // разметка которая присваивает значения сетайди, картинки, и кол-ва товара
            let html = `
            <div class="cart__product" data-id="${productId}" data-key="${keyCount}">
                <img class="cart__product-image" src="${img}">
                <div class="cart__product-count">${valueText}</div>
            </div>
            `;

            cartProducts.insertAdjacentHTML('afterBegin', html); // добавляем продукт в корзину
            
            updateMyStorage(keyCount, html) // функция обновляет моё хранилище
            cartProductRemote(); // функция удаления товара из корзины по клику на него
            cartImgAnimation(valueImg, img, productId); // анимация картинки

            localStorage.setItem('keyCountCart', keyCount); // записываем счётчикКлюч в localStorage
            keyCount++; // увеличиваем счётчикКлюч товаров в корзине
        }
    });
}

function cartProductRemote() { // функция удаления товара из корзины по клику на него
    let productCarts = cartProducts.querySelectorAll('.cart__product'); // продукты в корзине

    // productCarts[0], потому что новый продукт всегда с индексом 0
    productCarts[0].addEventListener('click', function(evt) { // клик по продукту
        let dataKey = productCarts[0].dataset.key; // dataKey продукта

        productCarts[0].remove(); // удаление продукта из карзины

        delete myStorage[dataKey]; // удаления продукта в корзине из хранилища по dataKey
        localStorage.setItem('myStorageKeyCart', JSON.stringify(myStorage)); // обновляем моё хранилище в localStorage

        if (cartProducts.querySelectorAll('.cart__product').length === 0) {
            cart.style.display = 'none';
        }
    })
}

function cartImgAnimation(valueImg, img, productId) { // анимация картинки
    let productCart = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

    let {top, left} = valueImg.getBoundingClientRect(); // находим стороны картинки продукта

    let topCart = productCart.getBoundingClientRect().top; // находим высоту картинки в корзине
    let leftCart = productCart.getBoundingClientRect().left; // находим левую сторону картинки в корзине

    let count = 1; // счётчик выполнения интервала

    // пятнадцатая часть от разницы сторон
    let differenceTop = (top - topCart) / 15;
    let differenceLeft = (leftCart - left) / 15;

    let newTop = top - differenceTop; // новая смещёная высота картинки
    let newLeft = left + differenceLeft; // новая смещёная стороны кратинки

    // разметка картинки анимации
    let htmlImg = `
        <img class="cart__product-image delete" style="position: fixed; top: ${top}px; left: ${left}px;" src="${img}">
    `;

    cartProducts.insertAdjacentHTML('afterEnd', htmlImg); // добавляем картинку в DOM

    let imgAnimation = cart.querySelector('.delete'); // находим элемент картинки в доме
    
    let intervalID = setInterval(function() { // интервал перемещения картинки (анимация)
        imgAnimation.style.top = newTop + 'px'; // изменяем высоту в доме
        imgAnimation.style.left = newLeft + 'px'; // изменяем сторону в доме

        newTop = newTop - differenceTop; // смещаем высоту картинки
        newLeft = newLeft + differenceLeft; // смещаем сторону картинки

        if (count === 14) { // если интервал выполнен 14 раз
            clearInterval(intervalID); // удаление интервала
            imgAnimation.remove(); // удаление картинки анимации
        }
        count++; // счётчик выполнения интервала
    }, 20, count)
}

function updateMyStorage(key, html) { // функция обновляет моё хранилище
    myStorage[key] = html; // добавляем продукт в корзине в моё хранилище
    localStorage.setItem('myStorageKeyCart', JSON.stringify(myStorage)); // обновляем моё хранилище в localStorage
}