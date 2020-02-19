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
    this.btnAddToCart = document.getElementById("btn-addtocart-single");
  }

  createCarousel() {
    // PRODUCT CAROUSEL
    const carouselWrapper_div = document.createElement("div");
    carouselWrapper_div.classList.add("carousel", "slide");
    carouselWrapper_div.dataset.ride = "carousel";

    const carousel_div = document.createElement("div");
    carousel_div.id = "product-carousel";
    carousel_div.classList.add("carousel", "slide");
    carousel_div.dataset.ride = "carousel";
    carouselWrapper_div.appendChild(carousel_div);
    const carouselInner_div = document.createElement("div");
    carouselInner_div.classList.add("carousel-inner");
    // Carousel indicators
    const carouselIndicators_ol = document.createElement("ol");
    carouselIndicators_ol.classList.add("carousel-indicators");
    this.product.media.forEach((item, index) => {
      const carouselIndicators_li = document.createElement("li");
      carouselIndicators_li.dataset.target = "#productcarousel";
      carouselIndicators_li.dataset.slideTo = index;
      if (item.endsWith("1.jpg")) {
        carouselIndicators_li.classList.add("active");
      }
      carouselIndicators_ol.appendChild(carouselIndicators_li);
      // Carousel items
      const carouselItem_div = document.createElement("div");
      carouselItem_div.classList.add("carousel-item");
      if (item.endsWith("1.jpg")) {
        carouselItem_div.classList.add("active");
      }
      // carousel images
      const carouselItem_img = document.createElement("img");
      carouselItem_img.classList.add("d-block", "w-100");
      carouselItem_img.src = item;
      carouselItem_img.alt = this.product.title;
      carouselItem_div.appendChild(carouselItem_img);

      carouselInner_div.appendChild(carouselItem_div);
    });
    // Carousel controls
    // previous button
    const carouselControlPrev_a = document.createElement("a");
    carouselControlPrev_a.classList.add("carousel-control-prev");
    carouselControlPrev_a.href = "#productcarousel";
    carouselControlPrev_a.role = "button";
    carouselControlPrev_a.dataset.slide = "prev";

    const carouselControlPrev_icon = document.createElement("span");
    carouselControlPrev_icon.classList.add("carousel-control-prev-icon");
    carouselControlPrev_icon.setAttribute("aria-hidden", true);
    carouselControlPrev_a.appendChild(carouselControlPrev_icon);

    const carouselControlPrev_sr = document.createElement("span");
    carouselControlPrev_sr.classList.add("sr-only");
    carouselControlPrev_sr.textContent = "Previous";
    carouselControlPrev_a.appendChild(carouselControlPrev_sr);
    // next button
    const carouselControlNext_a = document.createElement("a");
    carouselControlNext_a.classList.add("carousel-control-next");
    carouselControlNext_a.href = "#productcarousel";
    carouselControlNext_a.role = "button";
    carouselControlNext_a.dataset.slide = "next";

    const carouselControlNext_icon = document.createElement("span");
    carouselControlNext_icon.classList.add("carousel-control-next-icon");
    carouselControlNext_icon.setAttribute("aria-hidden", true);
    carouselControlNext_a.appendChild(carouselControlNext_icon);

    const carouselControlNext_sr = document.createElement("span");
    carouselControlNext_sr.classList.add("sr-only");
    carouselControlNext_sr.textContent = "Next";
    carouselControlNext_a.appendChild(carouselControlNext_sr);

    carousel_div.appendChild(carouselIndicators_ol);
    carousel_div.appendChild(carouselInner_div);
    carousel_div.appendChild(carouselControlPrev_a);
    carousel_div.appendChild(carouselControlNext_a);

    return carouselWrapper_div;
  }

  createImages() {
    let i = 1;
    const productImages_div = document.createElement("div");
    const productImages_row = document.createElement("div");
    productImages_row.classList.add("row", "pb-3", "no-gutters");
    productImages_div.classList.add("col");

    this.product.media.forEach(imageURL => {
      const productImages_img = document.createElement("img");
      productImages_img.classList.add("img-fluid", "col", "col-md-6", "p-1");
      productImages_img.src = imageURL;
      productImages_img.alt = this.product.title;
      productImages_row.appendChild(productImages_img);

      if (i % 2 == 0) {
        productImages_row.innerHTML += this.singleBreak;
      }
      i++;
    });

    productImages_div.appendChild(productImages_row);

    return productImages_div;
  }

  createTitlePrice() {
    const mobileTitlePrice_div = document.createElement("div");
    const productTitlePrice_div = document.createElement("div");
    productTitlePrice_div.classList.add("row");

    mobileTitlePrice_div.classList.add("d-flex", "justify-content-between");

    const mobileTitle = document.createElement("h4");
    mobileTitle.classList.add("card-title");
    mobileTitle.textContent = this.product.title;
    mobileTitlePrice_div.appendChild(mobileTitle);

    const mobilePrice = document.createElement("h4");
    mobilePrice.classList.add("card-title");
    mobilePrice.textContent = getFormatedPrice(this.product.price);
    mobileTitlePrice_div.appendChild(mobilePrice);

    const singleTitle = document.createElement("h2");
    singleTitle.classList.add("col", "d-none", "d-md-block");
    singleTitle.textContent = this.product.title;
    productTitlePrice_div.appendChild(singleTitle);

    productTitlePrice_div.innerHTML += this.singleBreak;

    const singlePrice = document.createElement("h3");
    singlePrice.classList.add("col", "d-none", "d-md-block");
    singlePrice.textContent = getFormatedPrice(this.product.price);
    productTitlePrice_div.appendChild(singlePrice);

    return [productTitlePrice_div, mobileTitlePrice_div];
  }

  createRadioButtons(data, type) {
    const radioWrap_div = document.createElement("div");

    const radioTitle_h6 = document.createElement("h6");
    radioTitle_h6.classList.add("p-1");
    radioTitle_h6.textContent = `Select ${type}:`;
    radioWrap_div.appendChild(radioTitle_h6);
    radioWrap_div.classList.add("col");

    const radioButtonsWrap_div = document.createElement("div");
    radioButtonsWrap_div.classList.add("d-flex", "flex-row");

    data.forEach((item, index) => {
      const radioButtonWrap_div = document.createElement("div");
      radioButtonWrap_div.classList.add(
        type == "size" ? "size-radio" : `${item.toLowerCase()}-radio`
      );

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `${type}`;
      radioInput.id =
        typeof item == "number" ? `size-${index}` : `${item.toLowerCase()}`;
      radioInput.value = item;
      radioButtonWrap_div.appendChild(radioInput);

      const radioLabel = document.createElement("label");
      radioLabel.htmlFor =
        typeof item == "number" ? `size-${index}` : `${item.toLowerCase()}`;
      radioLabel.textContent = item;
      radioButtonWrap_div.appendChild(radioLabel);

      radioButtonsWrap_div.appendChild(radioButtonWrap_div);
    });

    radioWrap_div.appendChild(radioButtonsWrap_div);

    return radioWrap_div;
  }

  createOptions() {
    const productOptions_div = document.createElement("div");
    productOptions_div.classList.add("row");

    productOptions_div.appendChild(
      this.createRadioButtons(this.product.sizes, "size")
    );
    productOptions_div.innerHTML += this.singleBreak;
    productOptions_div.appendChild(
      this.createRadioButtons(this.product.colors, "color")
    );

    productOptions_div.innerHTML += this.singleBreak;

    const btnAddToCart = document.createElement("button");
    btnAddToCart.classList.add("col", "mt-3", "btn", "btn-danger");
    btnAddToCart.id = "btn-addtocart-single";
    btnAddToCart.textContent = "Add to Cart";
    productOptions_div.appendChild(btnAddToCart);

    return productOptions_div;
  }

  createInfo() {
    const productOptions_div = document.createElement("div");
    productOptions_div.classList.add("row");

    const description_p = document.createElement("p");
    description_p.classList.add("col", "mt-3");
    description_p.textContent = this.product.description;
    productOptions_div.appendChild(description_p);

    productOptions_div.innerHTML += this.singleBreak;

    const features_ul = document.createElement("ul");
    this.product.features.forEach(feature => {
      const feature_li = document.createElement("li");
      feature_li.textContent = feature;
      features_ul.appendChild(feature_li);
    });

    productOptions_div.appendChild(features_ul);
    productOptions_div.innerHTML += this.singleBreak;

    const deliveryInfo_btn = document.createElement("button");
    deliveryInfo_btn.classList.add("btn", "btn-outline-dark", "col");
    deliveryInfo_btn.type = "button";
    deliveryInfo_btn.dataset.toggle = "collapse";
    deliveryInfo_btn.dataset.target = "#collapse-text";
    deliveryInfo_btn.setAttribute("aria-expanded", false);
    deliveryInfo_btn.setAttribute("aria-controls", "collapse-text");
    deliveryInfo_btn.textContent = "Delivery Info";
    productOptions_div.appendChild(deliveryInfo_btn);

    const deliveryInfo_div = document.createElement("div");
    deliveryInfo_div.classList.add("collapse");
    deliveryInfo_div.id = "collapse-text";

    const deliveryInfo_card = document.createElement("div");
    deliveryInfo_card.classList.add("card", "card-body");
    deliveryInfo_card.innerHTML = this.deliveryInfo;
    deliveryInfo_div.appendChild(deliveryInfo_card);

    productOptions_div.appendChild(deliveryInfo_div);

    return productOptions_div;
  }

  getCarousel() {
    return this.carousel;
  }

  getProductTitlePrice() {
    return this.productTitlePrice;
  }

  getMobileTitlePrice() {
    return this.mobileTitlePrice;
  }

  getProductOption() {
    return this.productOption;
  }

  getInfo() {
    return this.info;
  }

  getImages() {
    return this.productImages;
  }

  getModalAlert() {
    return this.modalAlert;
  }
}

class FeaturedProductsUI {
  constructor(featuredProducts) {
    this.featuredProducts = featuredProducts;
    this.featuredUI = this.createFeatured();
  }

  createProductCard(product) {
    const productCardWrap_div = document.createElement("div");
    productCardWrap_div.classList.add("col-md-4", "px-2");
    // product card
    const productCard_div = document.createElement("article");
    productCard_div.classList.add("card", "m-1", "product-card");
    productCardWrap_div.appendChild(productCard_div);

    const productCard_header = document.createElement("div");
    productCard_header.classList.add("card-header");
    productCard_div.appendChild(productCard_header);
    // anchor to product page
    const productCard_a = document.createElement("a");
    productCard_a.classList.add("text-dark", "text-decoration-none");
    productCard_a.href = `${homeURL}/product.html?productid=${product.id}`;
    productCard_header.appendChild(productCard_a);
    // product image
    const productCard_img = document.createElement("img");
    productCard_img.classList.add("card-img-top");
    productCard_img.src = product.media[0];
    productCard_img.alt = product.title;
    productCard_a.appendChild(productCard_img);
    // open modal for size and color selection
    const productAddToCart_btn = document.createElement("button");
    productAddToCart_btn.classList.add("btn-choose-options");
    productAddToCart_btn.type = "button";
    productAddToCart_btn.dataset.id = product.id;
    productAddToCart_btn.dataset.title = product.title;
    productAddToCart_btn.dataset.sizes = product.sizes;
    productAddToCart_btn.dataset.colors = product.colors;
    productAddToCart_btn.id = "openmodal";
    productCard_header.appendChild(productAddToCart_btn);
    // card body div
    const productCard_footer = document.createElement("div");
    productCard_footer.classList.add("card-body");
    productCard_div.appendChild(productCard_footer);
    // cardHeader
    const productCart_titlePrice = document.createElement("div");
    productCart_titlePrice.classList.add("d-flex", "justify-content-between");
    productCard_footer.appendChild(productCart_titlePrice);

    const productTitle_a = document.createElement("a");
    productTitle_a.classList.add("text-reset", "text-decoration-none");
    productTitle_a.href = `${homeURL}/product.html?productid=${product.id}`;
    productCart_titlePrice.appendChild(productTitle_a);
    // product Title
    const productTitle = document.createElement("h6");
    productTitle.classList.add("card-title");
    productTitle.textContent = product.title;
    productTitle_a.appendChild(productTitle);
    // product price
    const productPrice = document.createElement("h6");
    productPrice.classList.add("card-title", "text-danger");
    const price = getFormatedPrice(product.price);
    productPrice.textContent = price;
    productCart_titlePrice.appendChild(productPrice);
    // product short description
    const productDesc = document.createElement("p");
    productDesc.classList.add("card-text", "text-muted", "small");
    productDesc.textContent = product.description.substring(0, 40);
    productCard_footer.appendChild(productDesc);

    return productCardWrap_div;
  }

  createFeatured() {
    const featuredProductsWrap_div = document.createElement("div");
    featuredProductsWrap_div.classList.add("row");

    this.featuredProducts.forEach(product => {
      featuredProductsWrap_div.appendChild(this.createProductCard(product));
    });

    return featuredProductsWrap_div;
  }

  getFeaturedUI() {
    return this.featuredUI;
  }
}

async function init() {
  // elements
  const smallScreensContent_div = document.getElementById("small-screens-content");
  const singleInfo_div = document.getElementById("single-product-info");
  const productImages_div = document.getElementById("product-images");

  const searchParameters = new URLSearchParams(
    document.location.search.substring(1)
  );
  const productId = searchParameters.get("productid");

  const product = await fetchSingleProduct(productId);
  const deliveryInfo = await fetchDeliveryInfo();

  const cart = new Cart();
  const singleProductUI = new SingleProductUI(product, deliveryInfo.shoes);

  smallScreensContent_div.appendChild(singleProductUI.getCarousel());
  smallScreensContent_div.appendChild(singleProductUI.getMobileTitlePrice());
  singleInfo_div.appendChild(singleProductUI.getProductTitlePrice());
  singleInfo_div.appendChild(singleProductUI.getProductOption());
  singleInfo_div.appendChild(singleProductUI.getInfo());
  productImages_div.appendChild(singleProductUI.getImages());
  // event listeners
  const btnAddToCart = document.getElementById("btn-addtocart-single");
  btnAddToCart.addEventListener("click", () =>
    addToCart(product, cart, singleProductUI.getModalAlert())
  );

  const featuredProducts = await fetchFeaturedProducts ();

  const featuredProductsUI = new FeaturedProductsUI(featuredProducts);

  const featuredWrap_div = document.getElementById("recommended-products")

  featuredWrap_div.appendChild(featuredProductsUI.getFeaturedUI());


}

async function fetchFeaturedProducts() {
  const dataURL = 'https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/featuredproducts.json';
  try {
    const response = await fetch(dataURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch Error. Error: ", err);
  }
}

async function fetchSingleProduct(id) {
  const dataURL = `https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/product${id}.json`;
  try {
    const response = await fetch(dataURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch Error. Error: ", err);
  }
}

async function fetchDeliveryInfo() {
  const dataURL =
    "https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/deliveryinfo.json";
  try {
    const response = await fetch(dataURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch Error. Error: ", err);
  }
}

function addToCart(product, cart, alert) {
  const radiocolors = document.getElementsByName("color");
  const radiosizess = document.getElementsByName("size");
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
    alert.innerHTML = `You added ${product.title} to cart. <a href='${homeURL}/cart.html'>View Cart</a>`;
    alert.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
