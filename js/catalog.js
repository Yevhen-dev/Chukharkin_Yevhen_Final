"use strict";

let openFiltersBtn = document.getElementsByClassName("main__filters__first-line")[0];
let burger = document.getElementsByClassName("header__container__bag-menu__burger__burger-icon")[0];

let arrProducts =[];

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
    createProductsList();
};
window.onresize = function () {
  createProductsList();
};



// FUNCTION FOR TEMPLATE___________________________________________________
function createProductsList() {
    let arr = [];
    sortCatalogByDate();
    for(let i = 0; i < catalog.length; i++) {
        if( catalog[i].category === "women" && catalog[i].fashion === "Casual style" ) {
            arr.push(catalog[i])
        }
    }
    // arr.sort( function (current, next) {
    //     return next.dateAdded - current.dateAdded;
    // } );
    if(window.innerWidth <= 768) {
        let arrFirstItems = [];
        let arrSecondItems = [];
        for( let i = 0; i < arr.length; i++ ) {
            if( i <= 1 ) {
                arrFirstItems.push(arr[i])
            } else if( i > 1 && i <=7) {
                arrSecondItems.push(arr[i])
            }
        }
        createFirstLineItems(arrFirstItems);
        createRestItems(arrSecondItems);
    }
    if(window.innerWidth > 768 && window.innerWidth < 1024) {
        let arrFirstItems = [];
        let arrSecondItems = [];
        for( let i = 0; i < arr.length; i++ ) {
            if( i <= 2 ) {
                arrFirstItems.push(arr[i])
            } else {
                arrSecondItems.push(arr[i])
            }
        }
        createFirstLineItems(arrFirstItems);
        createRestItems(arrSecondItems);
    }
    if(window.innerWidth >= 1024) {
        let arrFirstItems = [];
        let arrSecondItems = [];
        for( let i = 0; i < arr.length; i++ ) {
            if( i <= 3 ) {
                arrFirstItems.push(arr[i])
            } else {
                arrSecondItems.push(arr[i])
            }
        }
        createFirstLineItems(arrFirstItems);
        createRestItems(arrSecondItems);
    }
}

function sortCatalogByDate() {
    for (let i = 0; i < catalog.length; i++) {
        catalog[i].dateAdded = Date.parse(catalog[i].dateAdded);
    }
    catalog.sort( function (current, next) {
        return next.dateAdded - current.dateAdded;
    } )
}


function createFirstLineItems(arr) {
    var firstList = document.getElementsByClassName("main__wrap__find__list")[0];
    var html = "";

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].hasNew && arr[i].discountedPrice === arr[i].price) {
            html += "\n            <li class=\"main__wrap__find__list__item\">\n                <a href=\"item.html\" class=\"main__wrap__find__list__item__link\">\n                    <div class=\"main__wrap__find__list__item__link__wrap-photo\">\n                        <div class=\"main__wrap__find__list__item__link__wrap-photo__fade\">View item</div>\n                        <span class=\"main__wrap__find__list__item__link__wrap-photo__new\">new</span>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__wrap__find__list__item__link__description\">\n                        <p class=\"main__wrap__find__list__item__link__description__name\">").concat(arr[i].title, "</p>\n                        <div class=\"main__wrap__find__list__item__link__description__price\">\n                            <span class=\"main__wrap__find__list__item__link__description__price-new\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        } else {
            html += "\n            <li class=\"main__wrap__find__list__item\">\n                <a href=\"item.html\" class=\"main__wrap__find__list__item__link\">\n                    <div class=\"main__wrap__find__list__item__link__wrap-photo\">\n                        <div class=\"main__wrap__find__list__item__link__wrap-photo__fade\">View item</div>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__wrap__find__list__item__link__description\">\n                        <p class=\"main__wrap__find__list__item__link__description__name\">").concat(arr[i].title, "</p>\n                        <div class=\"main__wrap__find__list__item__link__description__price\">\n                            <span class=\"main__wrap__find__list__item__link__description__price-new\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        }
    }

    firstList.innerHTML = html;
}

function createRestItems(arr) {
    var secondList = document.getElementsByClassName("main__products__list")[0];
    var html = "";

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].hasNew && arr[i].discountedPrice === arr[i].price) {
            html += "\n            <li class=\"main__products__list__item\">\n                <a href=\"itemPullover.html\" class=\"main__products__list__item__link\">\n                    <div class=\"main__products__list__item__link__wrap-photo\">\n                        <div class=\"main__products__list__item__link__wrap-photo__fade\">View item</div>\n                        <span class=\"main__wrap__find__list__item__link__wrap-photo__new\">new</span>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__products__list__item__link__description\">\n                        <p class=\"main__products__list__item__link__description__name\">Levi\u2019s Jeans for women</p>\n                        <div class=\"main__products__list__item__link__description__price\">\n                            <span class=\"main__products__list__item__link__description__price-new\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        } else if (arr[i].hasNew && arr[i].discountedPrice !== arr[i].price && arr[i].discountedPrice) {
            html += "\n            <li class=\"main__products__list__item\">\n                <a href=\"itemPullover.html\" class=\"main__products__list__item__link\">\n                    <div class=\"main__products__list__item__link__wrap-photo\">\n                        <div class=\"main__products__list__item__link__wrap-photo__fade\">View item</div>\n                        <span class=\"main__wrap__find__list__item__link__wrap-photo__new\">new</span>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__products__list__item__link__description\">\n                        <p class=\"main__products__list__item__link__description__name\">").concat(arr[i].title, "</p>\n                        <div class=\"main__products__list__item__link__description__price\">\n                            <span class=\"main__products__list__item__link__description__price-old\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                            <span class=\"main__products__list__item__link__description__price-new\">").concat("£" + arr[i].discountedPrice.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        } else if (arr[i].discountedPrice !== arr[i].price && arr[i].discountedPrice) {
            html += "\n            <li class=\"main__products__list__item\">\n                <a href=\"itemPullover.html\" class=\"main__products__list__item__link\">\n                    <div class=\"main__products__list__item__link__wrap-photo\">\n                        <div class=\"main__products__list__item__link__wrap-photo__fade\">View item</div>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__products__list__item__link__description\">\n                        <p class=\"main__products__list__item__link__description__name\">").concat(arr[i].title, "</p>\n                        <div class=\"main__products__list__item__link__description__price\">\n                            <span class=\"main__products__list__item__link__description__price-old\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                            <span class=\"main__products__list__item__link__description__price-new\">").concat("£" + arr[i].discountedPrice.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        } else {
            html += "\n            <li class=\"main__products__list__item\">\n                <a href=\"itemPullover.html\" class=\"main__products__list__item__link\">\n                    <div class=\"main__products__list__item__link__wrap-photo\">\n                        <div class=\"main__products__list__item__link__wrap-photo__fade\">View item</div>\n                        <img src=".concat(arr[i].thumbnail, " alt=").concat(arr[i].title, ">\n                    </div>\n                    <div class=\"main__products__list__item__link__description\">\n                        <p class=\"main__products__list__item__link__description__name\">").concat(arr[i].title, "</p>\n                        <div class=\"main__products__list__item__link__description__price\">\n                            <span class=\"main__products__list__item__link__description__price-new\">").concat("£" + arr[i].price.toFixed(2), "</span>\n                        </div>\n                    </div>\n                </a>\n            </li>");
        }
    }

    secondList.innerHTML = html;
}



// __________________________________________________________________________________

openFiltersBtn.onclick = function () {
    this.children[1].classList.toggle("active");
    let filters = document.getElementsByClassName("main__filters__hidden")[0];
    filters.classList.toggle("active");
    let blocker = document.getElementsByClassName("main--blocked-content")[0];
    blocker.classList.toggle("active");

    filters.onclick = function (event) {
        let fashion = document.getElementsByClassName("main__filters__first-line__text--fashion")[0];
        let type = document.getElementsByClassName("main__filters__first-line__text--type")[0];
        let color = document.getElementsByClassName("main__filters__first-line__text--color")[0];
        let brand = document.getElementsByClassName("main__filters__first-line__text--brand")[0];
        let size = document.getElementsByClassName("main__filters__first-line__text--size")[0];
        let price = document.getElementsByClassName("main__filters__first-line__text--price")[0];
        if(event.target.localName === "a") {
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-fashion-type__wrap-fashion__fashion__item") {
                    fashion.classList.add("active");
                    fashion.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-fashion-type__wrap-fashion__fashion")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        fashion.classList.remove("active");
                        fashion.innerText = "Fashion,"
                    }
                }
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-fashion-type__wrap-type__type__item") {
                    type.classList.add("active");
                    type.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-fashion-type__wrap-type__type")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        type.classList.remove("active");
                        type.innerText = "Product type,"
                    }
                }
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-color-brand__wrap-color__color__item") {
                    color.classList.add("active");
                    color.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-color-brand__wrap-color__color")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        color.classList.remove("active");
                        color.innerText = "Color,"
                    }
                }
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-color-brand__wrap-brand__brand__item") {
                    brand.classList.add("active");
                    brand.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-color-brand__wrap-brand__brand")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        brand.classList.remove("active");
                        brand.innerText = "Brand,"
                    }
                }
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-size-price__wrap-size__size__item") {
                    size.classList.add("active");
                    size.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-size-price__wrap-size__size")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        size.classList.remove("active");
                        size.innerText = "Size,"
                    }
                }
                if(event.target.parentElement.classList[0] === "main__filters__hidden__container-size-price__wrap-price__price__item") {
                    price.classList.add("active");
                    price.innerText = event.target.innerText + ",";
                    let list = document.getElementsByClassName("main__filters__hidden__container-size-price__wrap-price__price")[0];
                    for(let i = 0; i < event.target.parentElement.parentElement.children.length; i++) {
                        list.children[i].classList.remove("active");
                        if(event.target.parentElement.parentElement.children[i].children[0] === event.target) {
                            event.target.parentElement.parentElement.children[i].classList.add("active")
                        }
                    }
                    if(event.target.innerText === "Not selected") {
                        price.classList.remove("active");
                        price.innerText = "Price range"
                    }
                }


        }
    }
};

burger.onclick = function () {
    this.classList.toggle("active");
    let nav = document.getElementsByClassName("header__wrap-nav")[0];
    nav.classList.toggle("active") ;
};

let fashionFilter = document.getElementsByClassName("main__filters__desktop__wrap-fashion")[0];
let numItemFilter = 0;
fashionFilter.onmousemove = function (event) {
    let fashionList = document.getElementsByClassName("main__filters__desktop__wrap-fashion__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-fashion__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-fashion__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-fashion__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-fashion__title")[0];
    fashionList.classList.add("active");
    fashionList.style.width = this.offsetWidth + "px";
    fashionList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            fashionList.children[numItemFilter].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Fashion";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < fashionList.children.length; i++) {
                fashionList.children[i].classList.remove("highlight");
                if(fashionList.children[i].children[0] === event.target) {
                    numItemFilter = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    fashionFilter.onmouseout = function () {
        fashionList.classList.remove("active");
    };
};

let typeFilter = document.getElementsByClassName("main__filters__desktop__wrap-type")[0];
let numItemType = 0;
typeFilter.onmousemove = function (event) {
    let typeList = document.getElementsByClassName("main__filters__desktop__wrap-type__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-type__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-type__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-type__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-type__title")[0];
    typeList.classList.add("active");
    typeList.style.width = this.offsetWidth + "px";
    typeList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            typeList.children[numItemType].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Product type";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < typeList.children.length; i++) {
                typeList.children[i].classList.remove("highlight");
                if(typeList.children[i].children[0] === event.target) {
                    numItemType = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    typeFilter.onmouseout = function () {
        typeList.classList.remove("active");
    }
};

let colorFilter = document.getElementsByClassName("main__filters__desktop__wrap-color")[0];
let numItemColor = 0;
colorFilter.onmousemove = function (event) {
    let colorList = document.getElementsByClassName("main__filters__desktop__wrap-color__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-color__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-color__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-color__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-color__title")[0];
    colorList.classList.add("active");
    colorList.style.width = this.offsetWidth + "px";
    colorList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            colorList.children[numItemColor].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Color";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < colorList.children.length; i++) {
                colorList.children[i].classList.remove("highlight");
                if(colorList.children[i].children[0] === event.target) {
                    numItemColor = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    colorFilter.onmouseout = function () {
        colorList.classList.remove("active");
    }
};

let brandFilter = document.getElementsByClassName("main__filters__desktop__wrap-brand")[0];
let numItemBrand = 0;
brandFilter.onmousemove = function (event) {
    let brandList = document.getElementsByClassName("main__filters__desktop__wrap-brand__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-brand__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-brand__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-brand__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-brand__title")[0];
    brandList.classList.add("active");
    brandList.style.width = this.offsetWidth + "px";
    brandList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            brandList.children[numItemBrand].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Brand";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < brandList.children.length; i++) {
                brandList.children[i].classList.remove("highlight");
                if(brandList.children[i].children[0] === event.target) {
                    numItemBrand = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    brandFilter.onmouseout = function () {
        brandList.classList.remove("active");
    }
};

let sizeFilter = document.getElementsByClassName("main__filters__desktop__wrap-size")[0];
let numItemSize = 0;
sizeFilter.onmousemove = function (event) {
    let sizeList = document.getElementsByClassName("main__filters__desktop__wrap-size__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-size__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-size__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-size__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-size__title")[0];
    sizeList.classList.add("active");
    sizeList.style.width = this.offsetWidth + "px";
    sizeList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            sizeList.children[numItemSize].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Size";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < sizeList.children.length; i++) {
                sizeList.children[i].classList.remove("highlight");
                if(sizeList.children[i].children[0] === event.target) {
                    numItemSize = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    sizeFilter.onmouseout = function () {
        sizeList.classList.remove("active");
    }
};
let priceFilter = document.getElementsByClassName("main__filters__desktop__wrap-price")[0];
let numItemPrice = 0;
priceFilter.onmousemove = function (event) {
    let priceList = document.getElementsByClassName("main__filters__desktop__wrap-price__list")[0];
    let title = document.getElementsByClassName("main__filters__desktop__wrap-price__title__name--categories")[0];
    let select = document.getElementsByClassName("main__filters__desktop__wrap-price__title__name--selected")[0];
    let wrap = document.getElementsByClassName("main__filters__desktop__wrap-price__title__name")[0];
    let link = document.getElementsByClassName("main__filters__desktop__wrap-price__title")[0];
    priceList.classList.add("active");
    priceList.style.width = this.offsetWidth + "px";
    priceList.onclick = function (event) {
        if(event.target.innerText === "Not selected") {
            priceList.children[numItemPrice].classList.remove("highlight");
            title.classList.remove("active");
            wrap.classList.remove("active");
            select.innerText = "Price range";
            select.classList.remove("active");
            link.classList.remove("active");
        } else {
            title.classList.add("active");
            wrap.classList.add("active");
            select.innerText = event.target.innerText;
            select.classList.add("active");
            link.classList.add("active");
            for(let i = 0; i < priceList.children.length; i++) {
                priceList.children[i].classList.remove("highlight");
                if(priceList.children[i].children[0] === event.target) {
                    numItemPrice = i;
                    event.target.parentNode.classList.add("highlight")
                }
            }
        }
    };
    priceFilter.onmouseout = function () {
        priceList.classList.remove("active");
    }
};




let searchIcon = document.getElementsByClassName("header__wrap-nav__nav__search__icon")[0];
let input = document.getElementsByClassName("header__wrap-nav__nav__search__input")[0];
searchIcon.onmouseenter = function () {
    input.classList.add("active");
};
searchIcon.onclick = function () {
    let items = [];
    let result = [];
    if( input.value.length === 0 ) {
        console.log("try one more")
    } else {
        for( let i = 0; i < catalog.length; i++ ) {
            items.push(catalog[i].title.toLowerCase());
        }
        items.filter( item => {
            if(item.includes( input.value.toLowerCase() )) {
                result.push(item)
            }
        } );
        console.log(result);
    }

    input.classList.remove("active");
    input.value = "";
};
// input.oninput = function () {
//     if(this.value.length >3) {
//         for( let i = 0; i < catalog.length; i++ ) {
//             console.log(catalog[i].title)
//         }
//     }
// }



