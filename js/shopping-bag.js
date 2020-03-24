"use strict";

let burger = document.getElementsByClassName("header__container__bag-menu__burger__burger-icon")[0];
let clearBag = document.getElementsByClassName("main__count-total__clear__btn")[0];
let checkout = document.getElementsByClassName("main__count-total__wrap-btn__btn")[0];
let orderWrap = document.getElementsByClassName("main__wrap-order")[0];
let price = document.getElementById("price");
let discount = document.getElementsByClassName("main__count-total__discount")[0];
let bagSum = document.getElementsByClassName("main__count-total__wrap-sum__value")[0];

let priceHeader = document.getElementById("price-header");

let arrProducts = [];

function changeQuantityProducts() {
    let quantityItems = document.getElementById("count");
    if( localStorage.getItem("_private__user__cart") ) {
        let storage = JSON.parse(localStorage.getItem("_private__user__cart"));
        let total = 0;
        for( let i = 0; i < storage.length; i++ ) {
            total += storage[i][1]
        }
        quantityItems.innerText = total;
    } else {
        quantityItems.innerText = 0;
    }

}
function recountTotalSum() {
    let totalSum = document.getElementById("price-header");
    if( localStorage.getItem("_private__user__cart") ) {
        let storage = JSON.parse(localStorage.getItem("_private__user__cart"));
        arrProducts = storage;
        let total = 0;
        for ( let i = 0; i < storage.length; i++ ) {
            if(storage[i][0].discountedPrice) {
                let sum = storage[i][0].discountedPrice * storage[i][1];
                total += sum;
            } else {
                let sum = storage[i][0].price * storage[i][1];
                total += sum;
            }
        }
        totalSum.innerText = "£" + total.toFixed(2);
        bagSum.innerText = totalSum.innerText;
    } else {
        totalSum.innerText = "";
        bagSum.innerText = 0;
    }
}


window.onload = function () {
    changeQuantityProducts();
    recountTotalSum();
    createOrderList();
};



function createOrderList() {

    if (arrProducts.length === 0) {
        let text = document.createElement("p");
        text.classList.add("main__wrap-order__text");
        text.innerText = "Your shopping bag is empty. Use Catalog to add new items";
        orderWrap.appendChild(text);
        checkout.classList.add("disabled");
        clearBag.classList.add("disabled");
        return false;
    }

    let list = orderWrap.appendChild(document.createElement("ul"));
    list.className = "main__wrap-order__list";

    let countBestOffersItemsLeft = 0;
    let countBestOffersItemsRight = 0;

    let _loop = function _loop(k) {
        for (let i = 0; i < bestOffer.left.length; i++) {
            if(bestOffer.left[i] === arrProducts[k][0].id) {
                countBestOffersItemsLeft++;
                break;
            }
        }
        for (let i = 0; i < bestOffer.right.length; i++) {
            if(bestOffer.right[i] === arrProducts[k][0].id) {
                countBestOffersItemsRight++;
                break;
            }
        }

        if (countBestOffersItemsLeft >= 1 && countBestOffersItemsRight>=1) {
            discount.classList.add("active");
        } else {
            discount.classList.remove("active");
        }

        let li = list.appendChild(document.createElement("li"));
        li.className = "main__wrap-order__list__item";
        let photoLink = li.appendChild(document.createElement("a"));
        photoLink.href = "item.html";
        let wrapPhoto = photoLink.appendChild(document.createElement("div"));
        wrapPhoto.className = "main__wrap-order__list__item__wrap-photo";
        let fade = wrapPhoto.appendChild(document.createElement("div"));
        fade.className = "main__wrap-order__list__item__wrap-photo__fade";
        fade.innerText = "Edit item";
        let photo = wrapPhoto.appendChild(document.createElement("img"));
        photo.alt = arrProducts[k][0].title;
        photo.src = arrProducts[k][0].thumbnail;

        if (arrProducts[k][0].hasNew) {
            let titleNew = wrapPhoto.appendChild(document.createElement("span"));
            titleNew.className = "main__wrap-order__list__item__wrap-photo__new";
            titleNew.innerText = "new";
        }

        let description = li.appendChild(document.createElement("div"));
        description.className = "main__wrap-order__list__item__description";
        let name = description.appendChild(document.createElement("p"));
        name.className = "main__wrap-order__list__item__description__name";
        name.innerText = arrProducts[k][0].title;
        let price = description.appendChild(document.createElement("span"));
        price.className = "main__wrap-order__list__item__description__price";

        if (arrProducts[k][0].discountedPrice) {
            price.innerText = "£" + arrProducts[k][0].discountedPrice.toFixed(2);
        } else {
            price.innerText = "£" + arrProducts[k][0].price.toFixed(2);
        }

        let wrapColor = description.appendChild(document.createElement("div"));
        wrapColor.className = "main__wrap-order__list__item__description__wrap-color";
        let textColor = wrapColor.appendChild(document.createElement("span"));
        textColor.className = "main__wrap-order__list__item__description__wrap-color__text";
        textColor.innerText = "Color: ";
        let valueColor = wrapColor.appendChild(document.createElement("span"));
        valueColor.className = "main__wrap-order__list__item__description__wrap-color__value";
        valueColor.innerText = arrProducts[k][0].colors;
        let wrapSize = description.appendChild(document.createElement("div"));
        wrapSize.className = "main__wrap-order__list__item__description__wrap-size";
        let textSize = wrapSize.appendChild(document.createElement("span"));
        textSize.className = "main__wrap-order__list__item__description__wrap-size__text";
        textSize.innerText = "Size: ";
        let valueSize = wrapSize.appendChild(document.createElement("span"));
        valueSize.className = "main__wrap-order__list__item__description__wrap-size__value";
        valueSize.innerText = arrProducts[k][0].sizes;
        let wrapQuantity = description.appendChild(document.createElement("div"));
        wrapQuantity.className = "main__wrap-order__list__item__description__wrap-quantity";
        let textQuantity = wrapQuantity.appendChild(document.createElement("span"));
        textQuantity.className = "main__wrap-order__list__item__description__wrap-quantity__text";
        textQuantity.innerText = "Quantity: ";
        let wrapManualQuantity = wrapQuantity.appendChild(document.createElement("div"));
        wrapManualQuantity.className = "main__wrap-order__list__item__description__wrap-quantity__wrap";
        let minus = wrapManualQuantity.appendChild(document.createElement("img"));
        minus.src = "img/minus.png";
        minus.alt = "minus";
        minus.className = "main__wrap-order__list__item__description__wrap-quantity__wrap__minus";

        minus.onclick = function () {
            if (+quantity.innerText !== 1) {
                quantity.innerText = --arrProducts[k][1];
                localStorage.setItem("_private__user__cart", JSON.stringify(arrProducts));
                changeQuantityProducts();
                recountTotalSum();

                if (discount.classList[1]) {
                    priceHeader.innerText = "£" + (Number(priceHeader.innerText.split("£")[1]) - 15).toFixed(2);
                }
            }
        };

        let quantity = wrapManualQuantity.appendChild(document.createElement("span"));
        quantity.className = "main__wrap-order__list__item__description__wrap-quantity__wrap__value";
        quantity.innerText = arrProducts[k][1];
        let plus = wrapManualQuantity.appendChild(document.createElement("img"));
        plus.src = "img/plus.png";
        plus.alt = "plus";
        plus.className = "main__wrap-order__list__item__description__wrap-quantity__wrap__plus";

        plus.onclick = function () {
            quantity.innerText = ++arrProducts[k][1];
            localStorage.setItem("_private__user__cart", JSON.stringify(arrProducts));
            changeQuantityProducts();
            recountTotalSum();
            if (discount.classList[1]) {
                priceHeader.innerText = "£" + (Number(priceHeader.innerText.split("£")[1]) - 15).toFixed(2);
            }
        };

        let wrapRemove = description.appendChild(document.createElement("div"));
        wrapRemove.className = "main__wrap-order__list__item__description__remove-btn";
        let removeBtn = wrapRemove.appendChild(document.createElement("a"));
        removeBtn.href = "#";
        removeBtn.className = "main__wrap-order__list__item__description__remove-btn__btn";
        removeBtn.innerText = "Remove item";
        removeBtn.onclick = function () {
            arrProducts.splice(k,1);
            if( arrProducts.length === 0) {
                localStorage.clear();
            } else {
                localStorage.setItem("_private__user__cart", JSON.stringify(arrProducts));

            }
            orderWrap.innerText = "";
            changeQuantityProducts();
            recountTotalSum();
            createOrderList();
            return false
        }
    };

    for (let k = 0; k < arrProducts.length; k++) {
        _loop(k);
    }

    if (discount.classList[1]) {
        priceHeader.innerText = "£" + (Number(priceHeader.innerText.split("£")[1]) - 15).toFixed(2);
        bagSum.innerText = priceHeader.innerText;
    }
}


burger.onclick = function () {
    this.classList.toggle("active");
    let nav = document.getElementsByClassName("header__wrap-nav")[0];
    nav.classList.toggle("active") ;
};

function removeBag() {
    localStorage.clear();
    arrProducts.splice(0, arrProducts.length);
    orderWrap.innerText = "";
    discount.classList.remove("active");
    changeQuantityProducts();
    recountTotalSum();
    createOrderList();
}

clearBag.onclick = function () {
    removeBag();

};

checkout.onclick = function () {
    removeBag();
    let text = document.getElementsByClassName("main__wrap-order__text")[0];
    text.innerText = "Thank you for your purchase"
};