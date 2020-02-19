"use strict";
// shop filter smaller screens overlay
function openNav() {
  document.getElementById("shop-filters").style.left = "0";
  document.getElementById("filters-overlay").style.width = "100%";
  document.getElementById("filters-overlay").style.opacity = "1";
}

function closeOverlayNav() {
  document.getElementById("shop-filters").style.left = "-65vw";
  document.getElementById("filters-overlay").style.width = "0%";
  document.getElementById("filters-overlay").style.opacity = "0";
}

// production timer
let startTime = performance.now();
function executingAt() {
  return (performance.now() - startTime) / 1000;
}

class ShopProductsUI {
  constructor(products, productFilterCategories) {
    this.products = products;
    this.currentProducts = products;
    this.singleBreak = '<div class="w-100"></div>';
    this.shopGrid = this.createShopGrid();
    this.modalOptions = this.createOptionsModal();
    this.filterCategories = productFilterCategories;
  }

  // create product card
  createProductCard(product) {
    let productCardWrap_div = document.createElement("div");
    productCardWrap_div.classList.add("col-md-4", "px-2");

    // product card
    let productCard_div = document.createElement("article");
    productCard_div.classList.add("card", "m-1", "product-card");
    productCardWrap_div.appendChild(productCard_div);

    let productCard_header = document.createElement("div");
    productCard_header.classList.add("card-header");
    productCard_div.appendChild(productCard_header);

    // anchor to product page
    let productCard_a = document.createElement("a");
    productCard_a.classList.add("text-dark", "text-decoration-none");
    productCard_a.href = `${homeURL}/product.html?productid=${product.id}`;
    productCard_header.appendChild(productCard_a);

    // product image
    let productCard_img = document.createElement("img");
    productCard_img.classList.add("card-img-top");
    productCard_img.src = product.media[0];
    productCard_img.alt = product.title;
    productCard_a.appendChild(productCard_img);

    // open modal for size and color selection
    let productAddToCart_btn = document.createElement("button");
    productAddToCart_btn.classList.add("btn-choose-options");
    productAddToCart_btn.type = "button";
    productAddToCart_btn.dataset.id = product.id;
    productAddToCart_btn.dataset.title = product.title;
    productAddToCart_btn.dataset.sizes = product.sizes;
    productAddToCart_btn.dataset.colors = product.colors;
    productAddToCart_btn.id = "openmodal";
    productCard_header.appendChild(productAddToCart_btn);

    // card body div
    let productCard_footer = document.createElement("div");
    productCard_footer.classList.add("card-body");
    productCard_div.appendChild(productCard_footer);

    // cardHeader
    let productCart_titlePrice = document.createElement("div");
    productCart_titlePrice.classList.add("d-flex", "justify-content-between");
    productCard_footer.appendChild(productCart_titlePrice);

    let productTitle_a = document.createElement("a");
    productTitle_a.classList.add("text-reset", "text-decoration-none");
    productTitle_a.href = `${homeURL}/product.html?productid=${product.id}`;
    productCart_titlePrice.appendChild(productTitle_a);

    // product Title
    let productTitle = document.createElement("h6");
    productTitle.classList.add("card-title");
    productTitle.textContent = product.title;
    productTitle_a.appendChild(productTitle);

    // product price
    let productPrice = document.createElement("h6");
    productPrice.classList.add("card-title", "text-danger");
    let price = getFormatedPrice(product.price);
    productPrice.textContent = price;
    productCart_titlePrice.appendChild(productPrice);

    // product short description
    let productDesc = document.createElement("p");
    productDesc.classList.add("card-text", "text-muted", "small");
    productDesc.textContent = product.description.substring(0, 40);
    productCard_footer.appendChild(productDesc);

    return productCardWrap_div;
  }

  // products grid
  createShopGrid(products = this.products) {
    let i = 1;
    let productsGrid_div = document.createElement("div");
    productsGrid_div.classList.add("row");

    products.forEach(product => {
      productsGrid_div.appendChild(this.createProductCard(product));

      if (i % 3 == 0) {
        productsGrid_div.innerHTML += this.singleBreak;
      }
      i++;
    });
    return productsGrid_div;
  }

  // creating modal for adding product in store from shop page
  createOptionsModal() {
    let modalOptions_div = document.createElement("div");
    modalOptions_div.id = "modal-container";
    modalOptions_div.classList.add("modal-option-container");
    modalOptions_div.id = "modal";

    let modalDialog_div = document.createElement("div");
    modalDialog_div.classList.add("modal-option-dialog");
    modalDialog_div.id = "modal-dialog";
    modalOptions_div.appendChild(modalDialog_div);

    let modalHeader_div = document.createElement("div");
    modalHeader_div.classList.add("modal-option-header");
    modalDialog_div.appendChild(modalHeader_div);

    let modalCloseX_btn = document.createElement("button");
    modalCloseX_btn.type = "button";
    modalCloseX_btn.onclick = closeOptionsModal;
    modalCloseX_btn.classList.add("modal-option-close");
    modalHeader_div.appendChild(modalCloseX_btn);

    let modalTitle_h4 = document.createElement("h4");
    modalTitle_h4.id = "modal-options-title";
    modalHeader_div.appendChild(modalTitle_h4);

    let modalCloseX_span = document.createElement("span");
    modalCloseX_span.innerHTML = "&times;";
    modalCloseX_btn.appendChild(modalCloseX_span);

    let modalBody_div = document.createElement("div");
    modalBody_div.classList.add("modal-option-body");
    modalBody_div.id = "modal-options-body";
    modalDialog_div.appendChild(modalBody_div);

    let modalAlert_div = document.createElement("div");
    modalAlert_div.id = "modalalert";
    modalAlert_div.classList.add("alert", "alert-warning");
    modalAlert_div.style.display = "none";
    modalAlert_div.role = "alert";
    modalDialog_div.appendChild(modalAlert_div);

    let modalFooter_div = document.createElement("div");
    modalFooter_div.classList.add("modal-option-footer");
    modalDialog_div.appendChild(modalFooter_div);

    let modalClose_btn = document.createElement("button");
    modalClose_btn.classList.add("btn", "btn-secondary");
    modalClose_btn.textContent = "Close";
    modalClose_btn.onclick = closeOptionsModal;
    modalFooter_div.appendChild(modalClose_btn);

    let modalAddToCart_btn = document.createElement("button");
    modalAddToCart_btn.classList.add("btn", "btn-dark");
    modalAddToCart_btn.id = "add-to-cart-btn";
    modalAddToCart_btn.textContent = "Add to cart";
    modalFooter_div.appendChild(modalAddToCart_btn);

    return modalOptions_div;
  }
  // create modal radio buttons
  createModalRadioButtons(data, type) {
    let singleBreak = '<div class="w-100"></div>';
    let radioWrap_div = document.createElement("div");
    // title
    let radioTitle_h6 = document.createElement("h6");
    radioTitle_h6.textContent = `Select ${type}:`;
    radioWrap_div.appendChild(radioTitle_h6);

    radioWrap_div.innerHTML += singleBreak;

    let radioButtonsWrap_div = document.createElement("div");
    radioButtonsWrap_div.classList.add("d-flex", "flex-row");

    data.forEach((item, index) => {
      let radioButtonWrap_div = document.createElement("div");
      // add class based on type
      radioButtonWrap_div.classList.add(
        type == "size" ? "size-radio" : `${item.toLowerCase()}-radio`
      );

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `${type}`;
      radioInput.id =
        typeof item == "number" ? `size-${index}` : `${item.toLowerCase()}`;
      radioInput.value = item;
      radioButtonWrap_div.appendChild(radioInput);

      let radioLabel = document.createElement("label");
      radioLabel.htmlFor =
        typeof item == "number" ? `size-${index}` : `${item.toLowerCase()}`;
      radioLabel.textContent = item;
      radioButtonWrap_div.appendChild(radioLabel);

      radioButtonsWrap_div.appendChild(radioButtonWrap_div);
    });

    radioWrap_div.appendChild(radioButtonsWrap_div);
    return radioWrap_div;
  }

  // display modal with product options
  showOptionsModal() {
    let button = event.target;
    // extract info from button data-* attributes
    let colors = button.dataset.colors;
    let sizes = button.dataset.sizes;
    let title = button.dataset.title;
    let id = button.dataset.id;
    // convert data strings to arrays
    colors = colors.split(",");
    sizes = sizes.split(",");
    // display modal
    showModall();
    // set product info and options
    document.getElementById("modal-options-title").textContent = title;
    document.getElementById("add-to-cart-btn").dataset.id = id;
    let modalBody = document.getElementById("modal-options-body");
    modalBody.innerHTML = "";
    document.getElementById("modalalert").display = "none";

    let modalThumb_img = document.createElement("img");
    modalThumb_img.src = `./img/shoe${id}_1.jpg`;
    modalBody.appendChild(modalThumb_img);

    let radioButtons = document.createElement("div");

    radioButtons.appendChild(this.createModalRadioButtons(colors, "color"));
    radioButtons.appendChild(this.createModalRadioButtons(sizes, "size"));

    modalBody.appendChild(radioButtons);
  }

  // filter shop products
  filterProducts = () => {
    //reduce all existing filters categories
    const activeFilters = this.filterCategories.reduce(
      (acc, cur) => ({ ...acc, [cur]: [] }),
      {}
    );
    // get all filter checkbox elements
    const filtersElements = document.querySelectorAll(
      '#shop-filters input[type="checkbox"]'
    );
    // on filter change track checked filter
    filtersElements.forEach(
      element =>
        element.checked &&
        (activeFilters[element.name] = [
          ...activeFilters[element.name],
          element.value
        ])
    );

    this.currentProducts = this.products;

    this.currentProducts = this.currentProducts.filter(product => {
      let flag = false;
      for (const filter in activeFilters) {
        activeFilters[filter].forEach(prop => {
          switch (filter) {
            case "gender":
            case "style":
              prop.toUpperCase() === product[filter].toUpperCase() &&
                (flag = true);
              break;
            case "colors":
            case "features":
              product[filter].some(
                element => element.toUpperCase() === prop.toUpperCase()
              ) && (flag = true);
              break;
            case "sizes":
              product[filter].some(element => element === parseFloat(prop)) &&
                (flag = true);
              break;
            default:
              "";
          }
        });
      }
      return flag;
    });
    //check currentProducts is empty (no filters are selected)
    this.currentProducts.length == 0 && (this.currentProducts = this.products);
    // display filtered products
    this.shopGrid = this.createShopGrid(this.currentProducts);

    const shopGridWrapper = document.getElementById("products-wrapper");
    shopGridWrapper.innerHTML = "";
    shopGridWrapper.appendChild(this.shopGrid);
  };

  // sort current products
  sortProducts = order => {
    if (order === "hightolow") {
      this.currentProducts = this.currentProducts.sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
    }
    if (order === "lowtohigh") {
      this.currentProducts = this.currentProducts.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
    }
    if (order === "featured") {
      this.currentProducts = this.currentProducts.sort((a, b) =>
        a.id > b.id ? 1 : -1
      );
    }
    // display sorted products
    this.shopGrid = this.createShopGrid(this.currentProducts);

    const shopGridWrapper = document.getElementById("products-wrapper");
    shopGridWrapper.innerHTML = "";
    shopGridWrapper.appendChild(this.shopGrid);
  };

  // getters and setters
  getShopGrid() {
    return this.shopGrid;
  }

  getModalOptions() {
    return this.modalOptions;
  }

  getProducts() {
    return this.products;
  }
}

class ShopFilterUI {
  constructor(products) {
    this.products = products;
    this.activeFilter = {};
  }

  // create checkboxes based on products data
  createCheckButtons(data, type) {
    let checkButtonsFilter_div = document.createElement("div");
    checkButtonsFilter_div.classList.add("d-flex", "flex-wrap", "mb-3");
    // title
    let filterTitle_h6 = document.createElement("h6");
    filterTitle_h6.textContent = type.replace(/^\w/, c => c.toUpperCase());
    checkButtonsFilter_div.appendChild(filterTitle_h6);
    checkButtonsFilter_div.innerHTML += singleBreak;
    // iterate thru each item's data
    data.forEach(item => {
      let buttonWrap_div = document.createElement("div");
      // find out which type of checkbutton need to be created
      let styleclass;
      switch (type) {
        case "colors":
          styleclass = `${item.toLowerCase()}-color-checkbox`;
          break;
        case "sizes":
          styleclass = "size-checkbox";
          break;
        case "gender":
          styleclass = "gender-checkbox";
          break;
        default:
          styleclass = "custom-button-checkbox";
      }
      buttonWrap_div.classList.add(styleclass);
      // create button elements
      let buttonInput_checkbox = document.createElement("input");
      buttonInput_checkbox.type = "checkbox";
      buttonInput_checkbox.name = `${type}`;
      buttonInput_checkbox.id = `${type.toLowerCase()}-${
        type == "sizes" ? item : item.toLowerCase()
      }`;
      buttonInput_checkbox.value = `${
        type == "sizes" ? item : item.toLowerCase()
      }`;
      buttonWrap_div.appendChild(buttonInput_checkbox);

      let buttonInput_label = document.createElement("label");
      buttonInput_label.htmlFor = `${type.toLowerCase()}-${
        type == "sizes" ? item : item.toLowerCase()
      }`;
      buttonInput_label.textContent = item;
      buttonWrap_div.appendChild(buttonInput_label);

      checkButtonsFilter_div.appendChild(buttonWrap_div);
    });
    return checkButtonsFilter_div;
  }
  // extract passed options from products for later creating dynamic filters
  createFilterCategory(type) {
    let categoryOptions = [];
    this.products.forEach(product => {
      if (Array.isArray(product[`${type}`])) {
        product[`${type}`].forEach(item => {
          if (!categoryOptions.includes(item)) categoryOptions.push(item);
        });
      } else if (!categoryOptions.includes(product[`${type}`])) {
        categoryOptions.push(product[`${type}`]);
      }
    });
    categoryOptions.sort();
    if (categoryOptions.length == 0 || categoryOptions[0] == undefined) {
      console.error("Products doesn't containt type: ", type);
      return 0;
    } else {
      return categoryOptions;
    }
  }
  // create UI filters for every passed filter option
  createShopFilters(filters) {
    let sideShopFilters_div = document.createElement("div");
    filters.forEach(filter => {
      sideShopFilters_div.appendChild(
        this.createCheckButtons(...[this.createFilterCategory(filter), filter])
      );
    });
    return sideShopFilters_div;
  }
}

// shop initialization
async function init() {
  const shopGridWrapper = document.getElementById("products-wrapper");
  const modalWrapper_div = document.getElementById("optionModal");
  const shopFilters_div = document.getElementById("shop-filters");
  const sorting_buttons = document.querySelectorAll(".sorting-buttons");

  // create cart instance
  const cart = new Cart();
  // fetch products from API
  const products = await fetchProducts();

  // create shop filters UI instance
  const shopfilterUI = new ShopFilterUI(products);
  // desired filter categories
  const productFilterCategories = [
    "gender",
    "style",
    "colors",
    "sizes",
    "features"
  ];

  // extract options from product for passed categories, generate ui and add to DOM
  shopFilters_div.appendChild(
    shopfilterUI.createShopFilters(productFilterCategories)
  );

  // create Shop User Interface
  const shopProductUI = new ShopProductsUI(products, productFilterCategories);
  // get shop grid
  const shopGrid = shopProductUI.getShopGrid();
  // add User Interface to DOM
  shopGridWrapper.appendChild(shopGrid);
  // create and add modal UI to DOM
  let modalOptions = shopProductUI.getModalOptions();
  modalWrapper_div.appendChild(modalOptions);
  // listen for btn-choose-option

  document.addEventListener("click", () => {
    if (event.target.classList.value == "btn-choose-options")
      shopProductUI.showOptionsModal();
  });
  // add eventlistener for modal button add to cart
  document
    .getElementById("add-to-cart-btn")
    .addEventListener("click", () =>
      addToCart(products[event.target.dataset.id - 1], cart)
    );

  sorting_buttons.forEach(button =>
    button.addEventListener("click", () =>
      shopProductUI.sortProducts(button.dataset.sort)
    )
  );
  document
    .querySelectorAll('[class*="-checkbox"] > input')
    .forEach(checkbox => {
      checkbox.addEventListener("change", shopProductUI.filterProducts);
    });
}

// add to cart from modal
function addToCart(product, cart) {
  // on add to cart click check which radio buttons are selected
  let modalAlert = document.getElementById("modalalert");
  let radiocolors = document.getElementsByName("color");
  let radiosizes = document.getElementsByName("size");

  let clr, siz;
  radiocolors.forEach(radio => {
    if (radio.checked) {
      clr = radio.value;
    }
  });
  radiosizes.forEach(radio => {
    if (radio.checked) {
      siz = radio.value;
    }
  });
  // check if customer selected size and color
  if (!(clr && siz)) {
    modalAlert.innerHTML =
      "You have to select color and size to add product to cart";
    modalAlert.style.display = "block";
  } else {
    cart.addItemToCart(product, siz, clr);
    closeOptionsModal();
  }
}

//fetch products
async function fetchProducts() {
  const dataURL =
    "https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/product.json";
  try {
    let response = await fetch(dataURL);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch Error. Status Code: ", err);
  }
}

// initialize UI when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  init();
});
