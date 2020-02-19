'use strict';

// INDEX PAGE DYNAMIC CONTENT
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
// fetch featured products
async function fetchFeaturedProducts() {
  const dataURL =
  "https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/featuredproducts.json"
  try{
    let response = await fetch(dataURL)
    let data = await response.json()
    return data;
  } catch(err){
    console.error("Fetch Error. Status Code: ", err )
  }
}
// initialize index page dynamic content
async function init(){
  let featuredProductsWrapper = document.getElementById("featured-wrap")
  
  let cart = new Cart();
  let fetchedProducts = await fetchFeaturedProducts();
  
  const featuredUI = new FeaturedUI(fetchedProducts);

  featuredProductsWrapper.appendChild(featuredUI.getFeaturedUI());
}


// initialize UI when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
})