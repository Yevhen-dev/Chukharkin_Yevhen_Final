"use strict";

let arrProducts = [];

let burger = document.getElementsByClassName("header__container__bag-menu__burger__burger-icon")[0];


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
        totalSum.innerText = "£" + total.toFixed(2)
    }
}

window.onload = function () {
    changeQuantityProducts();
    recountTotalSum();
};


burger.onclick = function () {
    this.classList.toggle("active");
    let nav = document.getElementsByClassName("header__wrap-nav")[0];
    nav.classList.toggle("active") ;
};

let arrSize = document.getElementsByClassName("main__item__description__wrap-size__option");
for(let i = 0; i < arrSize.length; i++) {
    arrSize[i].onclick = function () {
        for (let j = 0; j < arrSize.length; j++) {
            arrSize[j].classList.remove("active");
        }
        this.classList.add("active");
    }
}

let arrColor = document.getElementsByClassName("main__item__description__wrap-color__option");
for(let i = 0; i < arrColor.length; i++) {
    arrColor[i].onclick = function () {
        for (let j = 0; j < arrColor.length; j++) {
            arrColor[j].classList.remove("active");
        }
        this.classList.add("active");
    }
}

let size = document.getElementsByClassName("main__item__description__wrap-size__title")[0];
let color = document.getElementsByClassName("main__item__description__wrap-color__title")[0];
let name = document.getElementsByClassName("main__item__description__name")[0].innerText;

let addToBag = document.getElementsByClassName("main__item__wrap-btn__btn")[0];
addToBag.onclick = function () {


    if( document.getElementsByClassName("main__item__description__wrap-size__option active")[0] &&  document.getElementsByClassName("main__item__description__wrap-color__option active")[0]) {
        size.classList.remove("active");
        color.classList.remove("active");
        for(let i = 0; i < catalog.length; i++) {
            if(catalog[i].id === "80d32566-d81c-4ba0-9edf-0eceda3b4360") {
                let bagCount = document.getElementById("count");
                let price = document.getElementById("price-header");
                let incr = +price.innerText + catalog[i].discountedPrice;
                bagCount.innerText = +bagCount.innerText + 1;
                price.innerText = incr.toFixed(2);


                let obj = {
                    id: catalog[i].id,
                    dateAdded: catalog[i].dateAdded,
                    title: name,
                    description: catalog[i].description,
                    discountedPrice: catalog[i].discountedPrice,
                    price: catalog[i].price,
                    hasNew: catalog[i].hasNew,
                    category: catalog[i].category,
                    fashion: catalog[i].fashion,
                    colors: document.getElementsByClassName("main__item__description__wrap-color__option active")[0].children[1].innerText,
                    sizes: document.getElementsByClassName("main__item__description__wrap-size__option active")[0].children[1].innerText,
                    thumbnail: catalog[i].thumbnail,
                    preview: catalog[i].preview
                };
                if(arrProducts.length === 0) {
                    arrProducts.push([obj,1]);
                } else {
                    (function detect () {
                        for(let i = 0; i < arrProducts.length; i++) {
                            if(_.isEqual(arrProducts[i][0], obj)) {
                                arrProducts[i][1]++;
                                return false
                            } else {
                                if(i === arrProducts.length - 1) {
                                    arrProducts.push([obj, 0])
                                }
                            }
                        }
                    })();
                }
            }
        }
    } else {
        size.classList.add("active");
        color.classList.add("active");
    }
    localStorage.setItem("_private__user__cart", JSON.stringify(arrProducts));
    changeQuantityProducts();
    recountTotalSum();
    return false;
};

let smallFirst = document.getElementsByClassName("main__item__wrap-photo__wrap-min__first")[0];
let smallSecond = document.getElementsByClassName("main__item__wrap-photo__wrap-min__second")[0];
let smallThird = document.getElementsByClassName("main__item__wrap-photo__wrap-min__third")[0];
let fullImg = document.getElementsByClassName("main__item__wrap-photo__full")[0].children[0];

function deleteFade() {
    let arrImages = document.getElementsByClassName("main__item__wrap-photo__wrap-min")[0];
    for(let i = 0; i < arrImages.children.length; i++) {
        arrImages.children[i].children[0].classList.remove("active");
    }
}

smallFirst.onclick = function() {
    deleteFade();
    this.children[0].classList.add("active");
    fullImg.src = this.children[1].src
};

smallSecond.onclick = function () {
    deleteFade();
    this.children[0].classList.add("active");
    fullImg.src = this.children[1].src
};

smallThird.onclick = function () {
    deleteFade();
    this.children[0].classList.add("active");
    fullImg.src = this.children[1].src
};
