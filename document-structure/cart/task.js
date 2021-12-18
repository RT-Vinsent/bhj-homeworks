// дз №6, Задача №3
// Корзина товаров

let cart = document.querySelector('.cart'); // корзина
let cartProducts = document.querySelector('.cart__products'); // продукты корзины
let product = Array.from(document.querySelectorAll('.product')); // элементы товаров
let localCart = JSON.parse(localStorage.getItem("cart")); // парсим cart из localStorage

if (localCart != null) { // если в localStorage есть cart  
    for (let i = 0; i < localCart.length; i++) { // то цикл по массиву
        htmlCartProductAdd(localCart[i].productId, localCart[i].img, localCart[i].valueText); // добавляем html разметку в DOM
        cartProductRemote() // вызываем функцию которая назначает удаления пррдукта из корзины при клике на него
    }
};

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
            let newCount = +valueText + count; // новое кол-во этого товара
           
            cartProductCount.innerText = newCount; // добавляем новое кол-во товара в корзину
            
            cartImgAnimation(valueImg, img, productId); // анимация картинки
            updateLocalStorage(null, productId, img, newCount);  // функция обновляет моё хранилище

        } else { // если товара в корзине нет, то добавляем его
            htmlCartProductAdd(productId, img, valueText); // добавляем html разметку в DOM
            updateLocalStorage(null, productId, img, valueText);  // функция обновляет моё хранилище
            cartProductRemote(); // функция удаления товара из корзины по клику на него
            cartImgAnimation(valueImg, img, productId); // анимация картинки
        }
    });
}

function cartProductRemote() { // функция удаления товара из корзины по клику на него
    let productCarts = cartProducts.querySelectorAll('.cart__product'); // продукты в корзине

    // productCarts[0], потому что новый продукт всегда с индексом 0
    productCarts[0].addEventListener('click', function(evt) { // клик по продукту
        let dataId = productCarts[0].dataset.id; // dataId продукта

        updateLocalStorage(dataId);  // функция обновляет моё хранилище

        productCarts[0].remove(); // удаление продукта из карзины

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
    let countMax = 15; // максимальное значение счётчик выполнения интервала

    // пятнадцатая часть от разницы сторон
    let differenceTop = (top - topCart) / countMax;
    let differenceLeft = (leftCart - left) / countMax;

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

        if (count === countMax) { // если интервал выполнен максимальное кол-во раз
            clearInterval(intervalID); // удаление интервала
            imgAnimation.remove(); // удаление картинки анимации
        }
        count++; // счётчик выполнения интервала
    }, 20, count)
}

function updateLocalStorage(del, productId, img, valueText) { // функция обновляет localStorage
    let cart = JSON.parse(localStorage.getItem("cart")); // парсим cart из localStorage
    
    if (cart != null && productId != null) {
        const productAdd = cart.findIndex(entry => entry.productId === productId); // ищем продукт в массиве
        if (productAdd != -1) {
            cart.splice(productAdd, 1, {productId, img, valueText}) // перезаписывает объект в массиве
        } else {
            cart.push({productId, img, valueText});  // пушит в массив объект
        } 
    }

    if (cart === null && productId != null) {
        cart = [{productId, img, valueText}];   // создаёт массив c объектом
    }

    if (cart != null && del != null) {
        const product = cart.find(entry => entry.productId === del); // ищем продукт в массиве
        cart.splice(cart.indexOf(product), 1); // удаляет продукт из массива
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // перезаписываем cart в localStorage
}

function htmlCartProductAdd(productId, img, valueText) { // добавляем html разметку в DOM
    let html = `
    <div class="cart__product" data-id="${productId}">
        <img class="cart__product-image" src="${img}">
        <div class="cart__product-count">${valueText}</div>
    </div>
    `;

    cartProducts.insertAdjacentHTML('afterBegin', html); // добавляем продукт в корзину
}