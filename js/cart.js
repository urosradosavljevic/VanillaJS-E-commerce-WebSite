'use strict';
// CART PAGE DYNAMIC CONTENT
class CartPageUI{
    constructor(cartItems){
        // set global cart items object
        this.cartItems = cartItems;
        // create summary and cart list with cart items
        this.createSummary(); // creates this.summary_div, this.summarySubtotal_span, this.summaryShipping_span, this.summaryTotal_span
        this.createCartList(); // creates this.cartList
        // set cart list and summary
        this.cartListWrapper = document.getElementById("cart-list")
        this.cartSummaryWrapper = document.getElementById("cart-summary")
        this.calculateSummary();
    }
    // create cart product cards
    createCartCard(cartItem){
        let cartCard = document.createElement('article')
        cartCard.classList.add("card", "mb-3")        
        cartCard.dataset.id = cartItem.id
        cartCard.dataset.size = cartItem.size
        cartCard.dataset.color = cartItem.color
        cartCard.style.border = "0"
        let cartRow = document.createElement('div')
        cartRow.classList.add('row','justify-content-center','no-gutters','m-2')
        cartCard.appendChild(cartRow)
        // card img
        let cartImgCol = document.createElement('div')
        cartImgCol.classList.add('col-2')
        cartRow.appendChild(cartImgCol)
        let cartImg = document.createElement('img')
        cartImg.classList.add('card-img-top')
        cartImg.src = cartItem.media[0]
        cartImg.alt = cartItem.title
        cartImgCol.appendChild(cartImg)
        // card body
        let cartBodyCol = document.createElement('div')
        cartBodyCol.classList.add('col-8','card-body','p-0','pl-3')
        cartRow.appendChild(cartBodyCol)
        // product title and price
        let cartTitlePrice = document.createElement('div')
        cartTitlePrice.classList.add('d-flex','justify-content-between')
        cartBodyCol.appendChild(cartTitlePrice)
        
        let cartTitle = document.createElement('h6')
        cartTitle.classList.add('card-title')
        cartTitle.textContent = cartItem.title
        cartTitlePrice.appendChild(cartTitle)
        
        let cartPrice = document.createElement('span')
        let price = getFormatedPrice(cartItem.price)
        cartPrice.textContent = price
        cartTitlePrice.appendChild(cartPrice)
        // product description
        let cartDesc = document.createElement('p')
        cartDesc.classList.add('card-text')
        cartDesc.textContent = cartItem.desc
        cartBodyCol.appendChild(cartDesc)
        // product options 
        let cartOptions = document.createElement('p')
        cartOptions.classList.add('card-text')
        cartBodyCol.appendChild(cartOptions)

        let cartSize = document.createElement('span')
        cartSize.classList.add('border-right', 'pr-2')
        cartSize.textContent = `Size: ${cartItem.size}`
        cartOptions.appendChild(cartSize)

        let cartColor = document.createElement('span')
        cartColor.classList.add('pl-2')
        cartColor.textContent = `Color: ${cartItem.color}`
        cartOptions.appendChild(cartColor)
        // remove from cart button
        let cartRemove = document.createElement('span')
        cartRemove.classList.add('pl-md-5')
        cartOptions.appendChild(cartRemove)

        let removeButton = document.createElement('button')
        removeButton.classList.add('btn', 'btn-link', 'cart-list-rmv')
        removeButton.textContent = "Remove"
        removeButton.dataset.id = cartItem.id
        removeButton.dataset.size = cartItem.size
        removeButton.dataset.color = cartItem.color
        cartOptions.appendChild(removeButton)
        
        return cartCard;
    }
    // product cards list
    createCartList(){
        let cartList = document.createElement('div')
        if(this.cartItems.length == 0){
            // if cart is empty place h2 with that information
            this.summary_div.style.display = "none" 
            cartList.innerHTML = `<h2 class="mx-auto">No products in cart..</h2>`
        }else{
            // if cart elements exists display them
            this.summary_div.style.display = "block" 
            this.cartItems.forEach(cartItem => {
                cartList.appendChild(this.createCartCard(cartItem))
            })    
        }
        this.cartList = cartList;
    }
    // create cart summary
    createSummary(){
        let summary_div = document.createElement('div')
        summary_div.classList.add('p-4','bg-dark','text-light','text-center')
        
        let summaryTitle_h5 = document.createElement('h5')
        summaryTitle_h5.classList.add('mb-3')
        summaryTitle_h5.textContent = 'Summary'
        summary_div.appendChild(summaryTitle_h5)
        // summary subtotal
        let summarySubtotal_div = document.createElement('div')
        summarySubtotal_div.classList.add('d-flex','justify-content-between')
        summary_div.appendChild(summarySubtotal_div)
        
        let subtotalTitle_h6 = document.createElement('h6')
        subtotalTitle_h6.textContent = "Subtotal"
        summarySubtotal_div.appendChild(subtotalTitle_h6)
        
        let subtotal_span = document.createElement('span')
        subtotal_span.id = 'summary-subtotal'
        summarySubtotal_div.appendChild(subtotal_span)
        // summary shippping
        let summaryShipping_div = document.createElement('div')
        summaryShipping_div.classList.add('d-flex','justify-content-between')
        summary_div.appendChild(summaryShipping_div)
        
        let shippingTitle_h6 = document.createElement('h6')
        shippingTitle_h6.textContent = "Shipping"
        summaryShipping_div.appendChild(shippingTitle_h6)
        
        let shipping_span = document.createElement('span')
        shipping_span.id = 'summary-shipping'
        summaryShipping_div.appendChild(shipping_span)
        // summary total
        let summaryTotal_div = document.createElement('div')
        summaryTotal_div.classList.add('d-flex','justify-content-between')
        summary_div.appendChild(summaryTotal_div)
        
        let totalTitle_h6 = document.createElement('h6')
        totalTitle_h6.textContent = "Total"
        summaryTotal_div.appendChild(totalTitle_h6)
        
        let total_span = document.createElement('span')
        total_span.id = 'summary-subtotal'
        summaryTotal_div.appendChild(total_span)
        // checkout button
        let checkout_button = document.createElement('button')
        checkout_button.classList.add('btn', 'btn-outline-light', 'my-3')
        checkout_button.textContent = 'Checkout'
        summary_div.appendChild(checkout_button)
        
        this.summary_div = summary_div 
        this.summarySubtotal_span = subtotal_span
        this.summaryShipping_span = shipping_span
        this.summaryTotal_span = total_span
    }
    
    // calculate and set cart summary info
    calculateSummary(){
        let subtotal = 0
        this.cartItems.forEach(cartItem => {
            subtotal = subtotal + cartItem.price
        })
        this.setSummary(getFormatedPrice(subtotal),getFormatedPrice(shipping),getFormatedPrice(subtotal + shipping))
    }
    // update cart UI items
    sync(cartItems){        
        this.cartItems = cartItems;

        this.createSummary();
        this.createCartList();

        this.cartListWrapper.innerHTML = ""
        this.cartListWrapper.appendChild(this.cartList)
        
        this.cartSummaryWrapper.innerHTML = ""
        this.cartSummaryWrapper.appendChild(this.summary_div)

        this.calculateSummary()
    }
    // getters and setters
    getCartList(){
        return this.cartList;
    }
    
    getSummary(){
        return this.summary_div;
    }
    
    setSummary(subtotal, shipping, total){
        this.summarySubtotal_span.textContent = subtotal;
        this.summaryShipping_span.textContent = shipping;
        this.summaryTotal_span.textContent = total;
    }
    
    setCartItems(cartItems){
        this.cartItems = cartItems;
    }
}
class FeaturedUI{
    constructor(featuredProducts){
      this.featuredProducts = featuredProducts;
      this.createFeatured(); // creates this.featuredProductsWrap_div
      
    }
    // create product card 
    createProductCard(product){
      let productCardWrap_div = document.createElement("div")
      productCardWrap_div.classList.add("col-md-4", "px-2")
      // product card
      let productCard_div = document.createElement("article")
      productCard_div.classList.add("card", "m-1", "product-card")
      productCardWrap_div.appendChild(productCard_div)      
      
      let productCard_header = document.createElement('div')
      productCard_header.classList.add('card-header')
      productCard_div.appendChild(productCard_header)
      // anchor to product page
      let productCard_a = document.createElement("a")
      productCard_a.classList.add("text-dark", "text-decoration-none")
      productCard_a.href = `${homeURL}/product.html?productid=${product.id}`
      productCard_header.appendChild(productCard_a)
      // product image
      let productCard_img = document.createElement("img")
      productCard_img.classList.add("card-img-top")
      productCard_img.src = product.media[0]
      productCard_img.alt = product.title
      productCard_a.appendChild(productCard_img)    
      // open modal for size and color selection
      let productAddToCart_btn = document.createElement("button")
      productAddToCart_btn.classList.add("btn-choose-options")
      productAddToCart_btn.type = "button"
      productAddToCart_btn.dataset.id = product.id
      productAddToCart_btn.dataset.title = product.title
      productAddToCart_btn.dataset.sizes = product.sizes
      productAddToCart_btn.dataset.colors = product.colors
      productAddToCart_btn.id = "openmodal"
      productCard_header.appendChild(productAddToCart_btn)
      // card body
      let productCard_footer = document.createElement("div")
      productCard_footer.classList.add("card-body")
      productCard_div.appendChild(productCard_footer)
      // card header
      let productCart_titlePrice = document.createElement("div")
      productCart_titlePrice.classList.add("d-flex", "justify-content-between")
      productCard_footer.appendChild(productCart_titlePrice)
      
      let productTitle_a = document.createElement("a")
      productTitle_a.classList.add('text-reset', 'text-decoration-none')
      productTitle_a.href = `${homeURL}/product.html?productid=${product.id}`
      productCart_titlePrice.appendChild(productTitle_a)
      // product title
      let productTitle = document.createElement("h6")
      productTitle.classList.add("card-title")
      productTitle.textContent = product.title
      productTitle_a.appendChild(productTitle)
      // product price
      let productPrice = document.createElement("h6")
      productPrice.classList.add("card-title", "text-danger")
      let price = getFormatedPrice(product.price)
      productPrice.textContent = price
      productCart_titlePrice.appendChild(productPrice)
      // product short description
      let productDesc = document.createElement("p")
      productDesc.classList.add("card-text", "text-muted", "small")
      productDesc.textContent = product.description.substring(0, 40)
      productCard_footer.appendChild(productDesc)
  
      return productCardWrap_div;
    }
    // create featured products and set it to variable
    createFeatured(){
      let featuredProductsWrap_div = document.createElement('div')
      featuredProductsWrap_div.classList.add('row')
  
      this.featuredProducts.forEach(product => {
        featuredProductsWrap_div.appendChild(this.createProductCard(product));
      })
    
      this.featuredProducts_div = featuredProductsWrap_div;
    }
    // getters and setters
    getFeaturedUI(){
      return this.featuredProducts_div;
    }
  }
// initialize dynamic page content
async function init(){
    // initialize cart
    const cart = new Cart();
    // initialize dynamic Page UI with cart content
    const cartPageUI = new CartPageUI(cart.getCartItems());
    // set dynamic page elements
    let cartListWrapper = document.getElementById("cart-list")
    let cartSummary = document.getElementById("cart-summary")
    cartListWrapper.appendChild(cartPageUI.getCartList());
    cartSummary.appendChild(cartPageUI.getSummary())    
    // set button event listeners
    document.querySelectorAll(".cart-list-rmv").forEach(btn => {
        btn.addEventListener('click', ()=>{
            removeCartListItem(cart,cartPageUI)
        })
    }) 
    // setup featured products
    let featuredProductsWrapper = document.getElementById("featured-wrap")
    
    let fetchedProducts = await fetchFeaturedProducts();
  
    const featuredUI = new FeaturedUI(fetchedProducts);
    featuredProductsWrapper.appendChild(featuredUI.getFeaturedUI());
}
// remove cart list item
function removeCartListItem(cart, cartPageUI){
    // remove passed item from cart object and local memory
    cart.removeItemFromCart(
        event.target.dataset.id,
        event.target.dataset.size,
        event.target.dataset.color
    )
    // update UI cart list by passing new cart items 
    cartPageUI.sync(cart.getCartItems())
    // add event listeners to newly created buttons
    document.querySelectorAll(".cart-list-rmv").forEach(btn => {
        btn.addEventListener('click', ()=>{
            removeCartListItem(cart, cartPageUI)   
        })
    })
}
// initialize UI when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
})