"use strict";


let burger = document.getElementsByClassName("header__container__bag-menu__burger__burger-icon")[0];
let arrowLeftUp  = document.getElementsByClassName("main__container__show-products__wrap__left__up")[0];
let arrowLeftDown = document.getElementsByClassName( "main__container__show-products__wrap__left__down" )[0];
let arrowRightUp = document.getElementsByClassName("main__container__show-products__wrap__right__up")[0];
let arrowRightDown = document.getElementsByClassName( "main__container__show-products__wrap__right__down" )[0];
let btnAddToBag = document.getElementsByClassName( "main__container__show-products__btn" )[0];
let btnSubscribe = document.getElementsByClassName( "main__container__about-offers__subscribe__btn" )[0];
let userStorage = [];

window.onload = function () {
    changeQuantityProducts();
    recountTotalSum();
};


burger.onclick = function () {
    this.classList.toggle("active");
    let nav = document.getElementsByClassName("header__wrap-nav")[0];
    nav.classList.toggle("active");
};



// ___________________________________________________BLOCK FOR ADD TO BAG BTN________________________________________________________________________________
// COUNT SAME ITEM IN STORAGE FOR ADD TO BAG BTN
function findSame (arr, obj) {
    for ( let i = 0; i < arr.length; i++ ) {
        if( _.isEqual( arr[i][0], obj) ) {
            arr[i][1]++;
            localStorage.setItem("_private__user__cart", JSON.stringify(arr));
            return false
        } else {
            if( i === arr.length - 1 ) {
                arr.push([obj, 1]);
                localStorage.setItem("_private__user__cart", JSON.stringify(arr));
                return false;
            }
        }
    }
}

// FIND ACTIVE ELEMENT LI OF LIST FOR ADD TO BAG BTN
function findActive(nameList) {
    for( let i = 0; i < leftList.children.length; i++ ) {
        if(nameList.children[i].classList[1]) {
            for( let j = 0; j < catalog.length; j++) {
                if(nameList.children[i].id === catalog[j].id ) {
                    return [
                        {
                            id: catalog[j].id,
                            dateAdded: catalog[j].dateAdded,
                            title: catalog[j].title,
                            description: catalog[j].description,
                            discountedPrice: catalog[j].discountedPrice,
                            price: catalog[j].price,
                            hasNew: catalog[j].hasNew,
                            category: catalog[j].category,
                            fashion: catalog[j].fashion,
                            colors: catalog[j].colors[0],
                            sizes: catalog[j].sizes[0],
                            thumbnail: catalog[j].thumbnail,
                            preview: catalog[j].preview
                        }, 1
                    ]
                }
            }
        }
    }
}

// CHANGE QUANTITY IN HEADER
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

// RECOUNT TOTAL PRICE IN HEADER
function recountTotalSum() {
    let totalSum = document.getElementById("price-header");
    if( localStorage.getItem("_private__user__cart") ) {
        let storage = JSON.parse(localStorage.getItem("_private__user__cart"));
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


btnAddToBag.onclick = function () {
    if(localStorage.getItem("_private__user__cart")) {
        let storage = JSON.parse(localStorage.getItem("_private__user__cart"));
        findSame(storage, findActive(leftList)[0]);
        findSame( storage, findActive(rightList)[0]);
    } else {
        userStorage.push(findActive(leftList));
        userStorage.push(findActive(rightList));
        localStorage.setItem("_private__user__cart", JSON.stringify(userStorage))
    }
    changeQuantityProducts();
    recountTotalSum();
    return false;
};
// ___________________________________________________________________________________________________________





let searchIcon = document.getElementsByClassName("header__wrap-nav__nav__search__icon")[0];

searchIcon.onclick = function () {
  if(window.innerWidth >= 768 && window.innerWidth < 1024) {
      let label = document.getElementsByClassName("header__wrap-nav__nav__search")[0];
      label.classList.add("active");
      label.children[0].classList.add("active");
      label.onclick = function () {
          document.onclick = function (event) {
              if(event.target !== searchIcon && event.target !== label && event.target !== label.children[0]) {
                  label.classList.remove("active");
                  label.children[0].classList.remove("active");
                  label.children[0].value = "";
              }
          }
      }
  }

};

btnSubscribe.onclick = function () {
  validationEmail();

};

function validationEmail () {
    let email = document.getElementById("email");
    let invalid = document.getElementsByClassName("main__container__about-offers__subscribe__invalid")[0];
    let correct = document.getElementsByClassName("main__container__about-offers__subscribe__correct")[0];
    let reg = /^([A-Za-z0-9_\-\.])+\@gmail.com/;

    if( reg.test( email.value ) === false ) {
        invalid.classList.add("active");
        setTimeout( function () {
            invalid.classList.remove("active")
        }, 3000 )
    } else {
        correct.classList.add("active");
        setTimeout( function () {
            correct.classList.remove("active");
            email.value = "";
        }, 3000 )
    }
}




let leftList = document.getElementsByClassName("main__container__show-products__wrap__left__list")[0];
let rightList = document.getElementsByClassName("main__container__show-products__wrap__right__list")[0];

function createBestOfferLeft() {
    for( let i = 0; i < bestOffer.left.length; i++) {
        for(let j = 0; j < catalog.length; j++) {
            if(catalog[j].id === bestOffer.left[i]) {
                let li = leftList.appendChild(document.createElement("li"));
                li.className = "main__container__show-products__wrap__left__list__item";
                li.id = catalog[j].id;

                let a = li.appendChild(document.createElement("a"));
                a.href = "item.html";
                a.className = "main__container__show-products__wrap__left__list__item__link";

                let wrap = a.appendChild(document.createElement("div"));
                wrap.className = "main__container__show-products__wrap__left__list__item__link__wrap";

                let fade = wrap.appendChild(document.createElement("div"));
                fade.className = "main__container__show-products__wrap__left__list__item__link__wrap__fade";
                fade.innerText = "View item";

                if(catalog[j].hasNew) {
                    let spanNew = wrap.appendChild(document.createElement("span"));
                    spanNew.className = "main__container__show-products__wrap__left__list__item__link__wrap__new";
                    spanNew.innerText = "new";
                }

                let img = wrap.appendChild(document.createElement("img"));
                img.src = catalog[j].thumbnail;
                img.alt = catalog[j].title;
                img.className = "main__container__show-products__wrap__left__list__item__link__wrap__photo";

                let itemName = a.appendChild(document.createElement("p"));
                itemName.className = "main__container__show-products__wrap__left__list__item__link__name";
                itemName.innerText = catalog[j].title;

                let itemPrice = a.appendChild(document.createElement("span"));
                itemPrice.className = "main__container__show-products__wrap__left__list__item__link__price";
                itemPrice.innerText = "£" + catalog[j].discountedPrice.toFixed(2);
            }
        }
    }
    leftList.children[0].classList.add("active");
}

function createBestOfferRight() {
    for( let i = 0; i < bestOffer.right.length; i++) {
        for(let j = 0; j < catalog.length; j++) {
            if(catalog[j].id === bestOffer.right[i]) {
                let li = rightList.appendChild(document.createElement("li"));
                li.className = "main__container__show-products__wrap__right__list__item";
                li.id = catalog[j].id;

                let a = li.appendChild(document.createElement("a"));
                a.href = "item.html";
                a.className = "main__container__show-products__wrap__right__list__item__link";

                let wrap = a.appendChild(document.createElement("div"));
                wrap.className = "main__container__show-products__wrap__right__list__item__link__wrap";

                let fade = wrap.appendChild(document.createElement("div"));
                fade.className = "main__container__show-products__wrap__right__list__item__link__wrap__fade";
                fade.innerText = "View item";


                let img = wrap.appendChild(document.createElement("img"));
                img.src = catalog[j].thumbnail;
                img.alt = catalog[j].title;
                img.className = "main__container__show-products__wrap__right__list__item__link__wrap__photo";

                let itemName = a.appendChild(document.createElement("p"));
                itemName.className = "main__container__show-products__wrap__right__list__item__link__name";
                itemName.innerText = catalog[j].title;

                if( catalog[j].discountedPrice && catalog[j].price ) {
                    let itemPrice = a.appendChild(document.createElement("span"));
                    itemPrice.className = "main__container__show-products__wrap__right__list__item__link__price";
                    let priceOld = itemPrice.appendChild(document.createElement("span"));
                    priceOld.className = "main__container__show-products__wrap__right__list__item__link__price--old";
                    priceOld.innerText =  "£" + catalog[j].price.toFixed(2);

                    let priceNew = itemPrice.appendChild(document.createElement("span"));
                    priceNew.innerText = "£" + catalog[j].discountedPrice.toFixed(2);
                } else {
                    let itemPrice = a.appendChild(document.createElement("span"));
                    itemPrice.className = "main__container__show-products__wrap__right__list__item__link__price";
                    itemPrice.innerText = "£" + catalog[j].price.toFixed(2);
                }

            }
        }
    }
    rightList.children[0].classList.add("active");
}

createBestOfferLeft();
createBestOfferRight();


function goUp(nameList) {
    for( let i = 0; i < nameList.children.length; i++ ) {
        if(nameList.children[i].classList[1]) {
            if( i === 0) {
                nameList.children[0].classList.remove("active");
                nameList.children[nameList.children.length - 1].classList.add("active");
                return false
            }
            nameList.children[i].classList.remove("active");
            nameList.children[--i].classList.add("active")
        }
    }
}

function goDown(nameList) {
    for( let i = 0; i < nameList.children.length; i++ ) {
        if(nameList.children[i].classList[1]) {
            if( i === nameList.children.length - 1 ) {
                nameList.children[0].classList.add("active");
                nameList.children[nameList.children.length - 1].classList.remove("active");
                return false
            }
            nameList.children[i].classList.remove("active");
            nameList.children[++i].classList.add("active")
        }
    }
}



function countPrice() {
    let discount = 15;
    let priceOld = document.getElementsByClassName("main__container__show-products__price--old")[0];
    let priceNew = document.getElementsByClassName("main__container__show-products__price--new")[0].children[0];
    let priceLeft = 0;
    let priceRight = 0;
    for( let i = 0; i < leftList.children.length; i++ ) {
        if(leftList.children[i].classList[1]) {
            for ( let j = 0; j < catalog.length; j++ ) {
                if ( catalog[j].id === leftList.children[i].id) {
                    priceLeft = catalog[j].discountedPrice
                }
            }
        }
    }
    for( let i = 0; i < rightList.children.length; i++ ) {
        if(rightList.children[i].classList[1]) {
            for ( let j = 0; j < catalog.length; j++ ) {
                if ( catalog[j].id === rightList.children[i].id) {
                    if(catalog[j].discountedPrice) {
                        priceRight = catalog[j].discountedPrice
                    }else{
                        priceRight = catalog[j].price
                    }
                }
            }
        }
    }
    let total = priceLeft + priceRight;
    priceOld.innerText = "£" + total.toFixed(2);
    priceNew.innerText = "£" + (total - discount).toFixed(2)
}


arrowLeftUp.onclick = function () {
    goUp(leftList);
    countPrice();
    return false
};

arrowLeftDown.onclick = function () {
    goDown(leftList);
    countPrice();
    return false
};

arrowRightUp.onclick = function () {
    goUp(rightList);
    countPrice();
    return false
};

arrowRightDown.onclick = function () {
    goDown(rightList);
    countPrice();
    return false
};