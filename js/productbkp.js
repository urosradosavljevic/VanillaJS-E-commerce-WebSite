"use strict";

class SingleProductUI {
  constructor(product, deliveryInfo) {
    this.product = product;
    this.deliveryInfo = deliveryInfo;
    // bootstrap single break
    this.singleBreak = '<div class="w-100"></div>';
    // get alert wrapper
    this.modalAlert = document.getElementById("modal-alert");
    this.modalAlert.style.display = "none";
    // mobile carousel
    this.carousel = this.createCarousel();
    [this.productTitlePrice, this.mobileTitlePrice] = this.createTitlePrice();
    this.productOption = this.createOptions();
    this.productImages = this.createImages();
    this.info = this.createInfo();
    this.btnAddToCart = document.getElementById('btn-addtocart-single')
  }

  createCarousel() {
    // PRODUCT CAROUSEL
    let carouselWrapper_div = document.createElement('div')
    carouselWrapper_div.classList.add('carousel', 'slide')
    carouselWrapper_div.dataset.ride="carousel"

    let carousel_div = document.createElement("div");
    carousel_div.id = "product-carousel";
    carousel_div.classList.add("carousel", "slide");
    carousel_div.dataset.ride = "carousel";
    carouselWrapper_div.appendChild(carousel_div)
    let carouselInner_div = document.createElement("div");
    carouselInner_div.classList.add("carousel-inner");
    // Carousel indicators
    let carouselIndicators_ol = document.createElement("ol");
    carouselIndicators_ol.classList.add("carousel-indicators");
    this.product.media.forEach((item, index) => {
      let carouselIndicators_li = document.createElement("li");
      carouselIndicators_li.dataset.target = "#productcarousel";
      carouselIndicators_li.dataset.slideTo = index;
      if (item.endsWith("1.jpg")) {
        carouselIndicators_li.classList.add("active");
      }
      carouselIndicators_ol.appendChild(carouselIndicators_li);
      // Carousel items
      let carouselItem_div = document.createElement("div");
      carouselItem_div.classList.add("carousel-item");
      if (item.endsWith("1.jpg")) {
        carouselItem_div.classList.add("active");
      }
      // carousel images
      let carouselItem_img = document.createElement("img");
      carouselItem_img.classList.add("d-block", "w-100");
      carouselItem_img.src = item;
      carouselItem_img.alt = this.product.title;
      carouselItem_div.appendChild(carouselItem_img);

      carouselInner_div.appendChild(carouselItem_div);
    });
    // Carousel controls
    // previous button
    let carouselControlPrev_a = document.createElement('a')
    carouselControlPrev_a.classList.add('carousel-control-prev')
    carouselControlPrev_a.href = "#productcarousel"
    carouselControlPrev_a.role = "button"
    carouselControlPrev_a.dataset.slide = "prev"
    
    let carouselControlPrev_icon = document.createElement('span')
    carouselControlPrev_icon.classList.add('carousel-control-prev-icon')
    carouselControlPrev_icon.setAttribute('aria-hidden',true)
    carouselControlPrev_a.appendChild(carouselControlPrev_icon)
    
    let carouselControlPrev_sr = document.createElement('span')
    carouselControlPrev_sr.classList.add("sr-only")
    carouselControlPrev_sr.textContent = "Previous" 
    carouselControlPrev_a.appendChild(carouselControlPrev_sr)
    // next button
    let carouselControlNext_a = document.createElement('a')
    carouselControlNext_a.classList.add('carousel-control-next')
    carouselControlNext_a.href = "#productcarousel"
    carouselControlNext_a.role = "button"
    carouselControlNext_a.dataset.slide = "next"

    let carouselControlNext_icon = document.createElement('span')
    carouselControlNext_icon.classList.add('carousel-control-next-icon')
    carouselControlNext_icon.setAttribute('aria-hidden',true)
    carouselControlNext_a.appendChild(carouselControlNext_icon)
    
    let carouselControlNext_sr = document.createElement('span')
    carouselControlNext_sr.classList.add("sr-only")
    carouselControlNext_sr.textContent = "Next" 
    carouselControlNext_a.appendChild(carouselControlNext_sr)

    carousel_div.appendChild(carouselIndicators_ol);
    carousel_div.appendChild(carouselInner_div);
    carousel_div.appendChild(carouselControlPrev_a)
    carousel_div.appendChild(carouselControlNext_a)

    return carouselWrapper_div;
  }
  
  createImages(){
    let i=1;
    let productImages_div = document.createElement('div');
    let productImages_row = document.createElement('div');
    productImages_row.classList.add('row', 'pb-3','no-gutters')
    productImages_div.classList.add('col');
    
    this.product.media.forEach(imageURL=>{
      let productImages_img = document.createElement('img')
      productImages_img.classList.add('img-fluid','col','col-md-6','p-1')
      productImages_img.src = imageURL
      productImages_img.alt = this.product.title
      productImages_row.appendChild(productImages_img)
      
      if ( i % 2 == 0) {
        productImages_row.innerHTML += this.singleBreak
      }
      i++;
    })

    productImages_div.appendChild(productImages_row)        
    
    return productImages_div;
  }

  createTitlePrice() {
    let mobileTitlePrice_div = document.createElement('div');
    let productTitlePrice_div = document.createElement('div');
    productTitlePrice_div.classList.add('row')
    
    mobileTitlePrice_div.classList.add('d-flex','justify-content-between')

    let mobileTitle = document.createElement("h4");
    mobileTitle.classList.add("card-title");
    mobileTitle.textContent = this.product.title;
    mobileTitlePrice_div.appendChild(mobileTitle);

    let mobilePrice = document.createElement("h4");
    mobilePrice.classList.add("card-title");
    mobilePrice.textContent = getFormatedPrice(this.product.price);
    mobileTitlePrice_div.appendChild(mobilePrice);

    let singleTitle = document.createElement("h2");
    singleTitle.classList.add("col", "d-none", "d-md-block");
    singleTitle.textContent = this.product.title;
    productTitlePrice_div.appendChild(singleTitle);

    productTitlePrice_div.innerHTML += this.singleBreak;

    let singlePrice = document.createElement("h3");
    singlePrice.classList.add("col", "d-none", "d-md-block");
    singlePrice.textContent = getFormatedPrice(this.product.price);
    productTitlePrice_div.appendChild(singlePrice);
    
    return [productTitlePrice_div, mobileTitlePrice_div];
  }

  createRadioButtons(data, type){
    let radioWrap_div = document.createElement('div');
    
    let radioTitle_h6 = document.createElement('h6')
    radioTitle_h6.classList.add("p-1");
    radioTitle_h6.textContent = `Select ${type}:`
    radioWrap_div.appendChild(radioTitle_h6)

    radioWrap_div.innerHTML += this.singleBreak;
    
    let radioButtonsWrap_div = document.createElement('div');
    radioButtonsWrap_div.classList.add('d-flex','flex-row')
  
    data.forEach((item, index) => {
      let radioButtonWrap_div = document.createElement('div')
      radioButtonWrap_div.classList.add(type == 'size' ? 'size-radio' : `${item.toLowerCase()}-radio`  );
            
      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `${type}`;
      radioInput.id = (typeof item == 'number' ? `size-${index}` : `${item.toLowerCase()}`);
      radioInput.value = item;
      radioButtonWrap_div.appendChild(radioInput);
      
      let radioLabel = document.createElement("label");
      radioLabel.htmlFor = (typeof item == 'number' ? `size-${index}` : `${item.toLowerCase()}`);
      radioLabel.textContent = item;
      radioButtonWrap_div.appendChild(radioLabel);
      radioButtonsWrap_div.appendChild(radioButtonWrap_div);
    })
    
    radioWrap_div.appendChild(radioButtonsWrap_div)

    radioWrap_div.innerHTML += this.singleBreak;
    
    return radioWrap_div;
  }
  
  createOptions(){
    let productOptions_div = document.createElement('div')
    productOptions_div.classList.add('row')
    
    productOptions_div.appendChild(this.createRadioButtons(this.product.sizes,'size'))
    productOptions_div.appendChild(this.createRadioButtons(this.product.colors,'color'))
    
    productOptions_div.innerHTML += this.singleBreak;

    let btnAddToCart = document.createElement("button");
    btnAddToCart.classList.add("col","m-1","mt-3","btn","btn-danger");
    btnAddToCart.id = "btn-addtocart-single";
    btnAddToCart.textContent = "Add to Cart";
    productOptions_div.appendChild(btnAddToCart)

    return productOptions_div;
  }

  createInfo(){    
    let productOptions_div = document.createElement('div')
    productOptions_div.classList.add('row')

    let description_p = document.createElement('p')
    description_p.classList.add('col','mt-3')
    description_p.textContent = this.product.description
    productOptions_div.appendChild(description_p)

    productOptions_div.innerHTML += this.singleBreak;
    
    let features_ul = document.createElement('ul')
    this.product.features.forEach(feature => {
      let feature_li = document.createElement('li')
      feature_li.textContent = feature
      features_ul.appendChild(feature_li)
    })
    
    productOptions_div.appendChild(features_ul)
    productOptions_div.innerHTML += this.singleBreak;
    
    let deliveryInfo_btn = document.createElement('button')
    deliveryInfo_btn.classList.add('btn','btn-outline-dark','col')
    deliveryInfo_btn.type = "button"
    deliveryInfo_btn.dataset.toggle = "collapse"
    deliveryInfo_btn.dataset.target = "#collapse-text"
    deliveryInfo_btn.setAttribute("aria-expanded", false)
    deliveryInfo_btn.setAttribute("aria-controls", "collapse-text")
    deliveryInfo_btn.textContent = "Delivery Info"
    productOptions_div.appendChild(deliveryInfo_btn)

    let deliveryInfo_div = document.createElement('div')
    deliveryInfo_div.classList.add('collapse')
    deliveryInfo_div.id = "collapse-text"
    
    let deliveryInfo_card = document.createElement('div')
    deliveryInfo_card.classList.add('card','card-body')
    deliveryInfo_card.innerHTML = this.deliveryInfo
    deliveryInfo_div.appendChild(deliveryInfo_card)
    
    productOptions_div.appendChild(deliveryInfo_div)

    return productOptions_div;
  }

  getCarousel(){
    return this.carousel;
  }

  getProductTitlePrice(){
    return this.productTitlePrice;
  }

  getMobileTitlePrice(){
    return this.mobileTitlePrice;
  }

  getProductOption(){
    return this.productOption;
  }

  getInfo(){
    return this.info;
  }

  getImages(){
    return this.productImages;
  }

  getModalAlert(){
    return this.modalAlert;
  }

}

class RecommendedProductsUI{
  constructor(recommendedProducts){
    this.recommendedProducts = recommendedProducts;
  }

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
    // card body div
    let productCard_footer = document.createElement("div")
    productCard_footer.classList.add("card-body")
    productCard_div.appendChild(productCard_footer)
    // cardHeader
    let productCart_titlePrice = document.createElement("div")
    productCart_titlePrice.classList.add("d-flex", "justify-content-between")
    productCard_footer.appendChild(productCart_titlePrice)
    
    let productTitle_a = document.createElement("a")
    productTitle_a.classList.add('text-reset', 'text-decoration-none')
    productTitle_a.href = `${homeURL}/product.html?productid=${product.id}`
    productCart_titlePrice.appendChild(productTitle_a)
    // product Title
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

  createRecommended(){
      let featuredProductsWrap_div = document.createElement('div')
      featuredProductsWrap_div.classList.add('row')

        this.featuredProducts.forEach(product => {
          featuredProductsWrap_div.appendChild(this.createProductCard(product));
      })
  
    return featuredProductsWrap_div;
  }

  getFeaturedUI(){
    return this.featuredUI;
  }
}

async function init(){
  let smallScreensContent_div = document.getElementById("small-screens-content");
  let singleInfo_div = document.getElementById("single-product-info");
  let productImages_div = document.getElementById("product-images");
  
  let searchParameters = new URLSearchParams(
  document.location.search.substring(1)
  );
  let productId = searchParameters.get("productid");
  
  let product = await fetchSingleProduct(productId);
  let deliveryInfo = await fetchDeliveryInfo();
  
  let cart = new Cart();
  const singleProductUI = new SingleProductUI(product, deliveryInfo.shoes);
  
  smallScreensContent_div.appendChild(singleProductUI.getCarousel())
  smallScreensContent_div.appendChild(singleProductUI.getMobileTitlePrice())
  singleInfo_div.appendChild(singleProductUI.getProductTitlePrice())
  singleInfo_div.appendChild(singleProductUI.getProductOption())
  singleInfo_div.appendChild(singleProductUI.getInfo())
  productImages_div.appendChild(singleProductUI.getImages())
  
  let btnAddToCart = document.getElementById('btn-addtocart-single');
  btnAddToCart.addEventListener('click', () => addToCart(product,cart, singleProductUI.getModalAlert()))
    
}

async function fetchSingleProduct(id) {
  const dataURL = `../data/product${id}.json`;
  try {
    let response = await fetch(dataURL);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("Fetch Error. Error: ", err);
  }
}

async function fetchDeliveryInfo() {
  const dataURL = `../data/deliveryinfo.json`;
  try {
    let response = await fetch(dataURL);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("Fetch Error. Error: ", err);
  }
}

function addToCart(product,cart, alert){
  let radiocolors = document.getElementsByName("color");
  let radiosizess = document.getElementsByName("size");
  let clr, siz;
  radiocolors.forEach(radio => {
    if (radio.checked) {
      clr = radio.value;
    }
  });
  radiosizess.forEach(radio => {
    if (radio.checked) {
      siz = radio.value;
    }
  });
  // check if customer selected size and color
  if (!(clr && siz)) {
    alert.innerHTML =
      "You have to select color and size to add product to cart";
      alert.style.display = "block";
  } else {
    cart.addItemToCart(product, siz, clr);
    console.log(siz, clr, product);
    alert.innerHTML = `You added ${product.title} to cart. <a href='${homeURL}/cart.html'>View Cart</a>`;
    alert.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
