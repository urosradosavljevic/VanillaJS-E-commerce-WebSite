"use strict";
let singleBreak = '<div class="w-100"></div>';
// SETUP JAVASCRIPT FILE FOR DYNAMIC CONTENT OF PAGES 
let shipping = 10 // price of shipping
let homeURL = "" // home url
// product modal show
function showModall() {
  document.getElementById("modal").classList.add('modal-option-container-open');
  document.getElementById("modal-dialog").classList.add('modal-option-body-open');
  document.getElementById("modalalert").style.display = 'none'
}
// product modal hide
function closeOptionsModal() {
  document.getElementById("modal").classList.remove('modal-option-container-open');
  document.getElementById("modal-dialog").classList.remove('modal-option-body-open');
}
// get passed value formated with currency sign 
let getFormatedPrice = value => {
  let price = new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "EUR"
  }).format(value);
  return price;
};
// shop cart class
class Cart {
  constructor() {
    this.KEY = "asdljkhafgpunefspfsfd"; // cart key
    this.content = []
    this.init();
  }
  // initialize cart by getting it from local storage
  init() {
    let _content = localStorage.getItem(this.KEY);
    if (_content) {
      this.content = JSON.parse(_content);
    }
    this.sync();
  }
  // synchronize cart items from global object with local storage
  // update small cart length indicator 
  sync() {
    let _cart = JSON.stringify(this.content);
    localStorage.setItem(this.KEY, _cart);
    let cartSpan = document.getElementById("cart-span");
    let cartLenght = this.content.length;
    cartSpan.dataset.cartCount = cartLenght;
    cartSpan.innerHTML = cartLenght;
  }
  // add item with passed values to cart
  addItemToCart(product, size, color) {
    let id = product.id
    // get product with passed values from cart
    let cartMatch = this.content.filter(element => element.id == id && element.color == color && element.size == size);
    // if required product doesn't already exists, add it    
    if (
      cartMatch === undefined ||
      cartMatch.length == 0
    ) {
      this.content.push({
        id: product.id,
        title: product.title,
        size: size,
        color: color,
        price: product.price,
        desc: product.description.substring(0, 40),
        media: product.media,
        qty: 1
      });
    } else {
    // if product already exists in cart, increase it quantity
    this.content.forEach(element => {
      if (
        element.id == id &&
        element.color == color &&
        element.size == size
        ) {
          element.qty++;
        }
      });
    }
    this.sync();
    console.log("cart content", this.content);
  }
  // remove passed item from cart 
  removeItemFromCart(id, size, color) {
    let productIndex = this.content.findIndex(element => (element.id == id && element.color == color && element.size == size));
    this.content.splice(productIndex, 1)
    this.sync()
  }
  // getters and setters
  getCartItems() {
    return this.content;
  }


}