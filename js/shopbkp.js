"use strict"
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
let startTime = performance.now()
function executingAt() {
  return (performance.now() - startTime) / 1000
}

class ShopProductsUI{
  constructor(products) {
    this.products = products;
    this.singleBreak = '<div class="w-100"></div>';
    this.shopGrid = this.createShopGrid();
    this.modalOptions = this.createOptionsModal();
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

  createShopGrid(){
    let i=1;
    let productsGrid_div = document.createElement('div')
    productsGrid_div.classList.add('row')

    this.products.forEach(product => {

      productsGrid_div.appendChild(this.createProductCard(product));
      
      if ( i % 3 == 0) {
        productsGrid_div.innerHTML += this.singleBreak
      }
      i++;

    })
    return productsGrid_div;
  }

  // creating modal for adding product in store from shop page
  createOptionsModal(){
    let modalOptions_div = document.createElement('div')
    modalOptions_div.id = "modal-container"
    modalOptions_div.classList.add('modal-option-container')
    modalOptions_div.id="modal"

    let modalDialog_div = document.createElement('div')
    modalDialog_div.classList.add('modal-option-dialog')
    modalDialog_div.id = "modal-dialog"
    modalOptions_div.appendChild(modalDialog_div)

    let modalHeader_div = document.createElement('div')
    modalHeader_div.classList.add('modal-option-header')
    modalDialog_div.appendChild(modalHeader_div)
    
    let modalCloseX_btn = document.createElement('button')
    modalCloseX_btn.type = "button"
    modalCloseX_btn.onclick = closeOptionsModal
    modalCloseX_btn.classList.add('modal-option-close')
    modalHeader_div.appendChild(modalCloseX_btn)
    
    let modalTitle_h4 = document.createElement('h4')
    modalTitle_h4.id = 'modal-options-title'
    modalHeader_div.appendChild(modalTitle_h4)
    
    let modalCloseX_span = document.createElement('span')
    modalCloseX_span.innerHTML = "&times;"
    modalCloseX_btn.appendChild(modalCloseX_span)
    
    let modalBody_div = document.createElement('div')
    modalBody_div.classList.add('modal-option-body')
    modalBody_div.id = 'modal-options-body'
    modalDialog_div.appendChild(modalBody_div)    
            
    let modalAlert_div = document.createElement('div')
    modalAlert_div.id = "modalalert"
    modalAlert_div.classList.add('alert', 'alert-warning')
    modalAlert_div.style.display = "none"
    modalAlert_div.role  = "alert"
    modalDialog_div.appendChild(modalAlert_div)

    let modalFooter_div = document.createElement('div')
    modalFooter_div.classList.add('modal-option-footer')
    modalDialog_div.appendChild(modalFooter_div)


    let modalClose_btn = document.createElement('button')
    modalClose_btn.classList.add("btn", "btn-secondary")
    modalClose_btn.textContent = "Close"
    modalClose_btn.onclick = closeOptionsModal
    modalFooter_div.appendChild(modalClose_btn)
    
    let modalAddToCart_btn = document.createElement('button')
    modalAddToCart_btn.classList.add("btn", "btn-dark")
    modalAddToCart_btn.id = "add-to-cart-btn"
    modalAddToCart_btn.textContent = "Add to cart"
    modalFooter_div.appendChild(modalAddToCart_btn)

    return modalOptions_div;    
  }

  getShopGrid(){
    return this.shopGrid;
  }

  getModalOptions(){
    return this.modalOptions;
  }

  getProducts(){
    return this.products;
  }
}

class ShopFilterUI{
  constructor(products){
    this.products = products;
    this.activeFilter = {}
  }
  // create radio buttons based on products data
  createRadioButtons(data, type){
    let radioButtonsFilter_div = document.createElement('div')
    radioButtonsFilter_div.classList.add(`filter-${type.toLowerCase()}`,'mb-3')
    // title
    let filterTitle_h6 = document.createElement('h6')
    filterTitle_h6.textContent = type
    radioButtonsFilter_div.appendChild(filterTitle_h6)
    // iterate thru each item's data
    data.forEach((item, index)=>{
      let buttonWrap_div = document.createElement('div')
      buttonWrap_div.classList.add('custom-control', 'custom-radio')

      let buttonInput_radio = document.createElement('input')
      buttonInput_radio.type = "radio"
      buttonInput_radio.classList.add('custom-control-input')
      buttonInput_radio.id = `${type.toLowerCase() + index}`
      buttonWrap_div.appendChild(buttonInput_radio)
      
      let buttonInput_label = document.createElement('label')
      buttonInput_label.classList.add('custom-control-label')
      buttonInput_label.htmlFor = `${type.toLowerCase() + index}`
      buttonInput_label.textContent = item
      buttonWrap_div.appendChild(buttonInput_label)      

      radioButtonsFilter_div.appendChild(buttonWrap_div)
    })
    return radioButtonsFilter_div;
  }

  // create checkboxes based on products data
  createCheckButtons(data, type){
    let checkButtonsFilter_div = document.createElement('div')
    checkButtonsFilter_div.classList.add('d-flex','flex-wrap', 'mb-3')
    // title
    let filterTitle_h6 = document.createElement('h6')
    filterTitle_h6.textContent = type.replace(/^\w/, c => c.toUpperCase())
    checkButtonsFilter_div.appendChild(filterTitle_h6)    
    checkButtonsFilter_div.innerHTML += singleBreak
    // iterate thru each item's data
    data.forEach((item)=>{
      let buttonWrap_div = document.createElement('div')
      // find out which type of checkbutton need to be created
      let styleclass; 
      switch(type){
        case 'colors':
          styleclass = `${item.toLowerCase()}-color-checkbox`;
          break;
        case 'sizes':
          styleclass = 'size-checkbox';
          break;
        case 'gender':
          styleclass = 'gender-checkbox';
          break;
        default:
          styleclass = 'custom-button-checkbox';
      }
      buttonWrap_div.classList.add(styleclass);
      // create button elements
      let buttonInput_checkbox = document.createElement('input')
      buttonInput_checkbox.type = "checkbox"
      buttonInput_checkbox.name = `${type}`;
      buttonInput_checkbox.id = `${type.toLowerCase()}-${type == 'sizes' ? item : item.toLowerCase()}`
      buttonInput_checkbox.value = `${type == 'sizes' ? item : item.toLowerCase()}`
      buttonWrap_div.appendChild(buttonInput_checkbox)
      
      let buttonInput_label = document.createElement('label')
      buttonInput_label.htmlFor = `${type.toLowerCase()}-${type == 'sizes' ? item : item.toLowerCase()}`
      buttonInput_label.textContent = item
      buttonWrap_div.appendChild(buttonInput_label)      

      checkButtonsFilter_div.appendChild(buttonWrap_div)
    })
    return checkButtonsFilter_div;
  }
  // extract passed options from products for later creating dynamic filters
  createFilterCategory(type){
    let categoryOptions = []
    this.products.forEach(product => {
      if(Array.isArray(product[`${type}`])){
        product[`${type}`].forEach(item => {
          if(!categoryOptions.includes(item))
            categoryOptions.push(item)
        })
      }else if(!categoryOptions.includes(product[`${type}`])){
        categoryOptions.push(product[`${type}`])
      }
    })
    categoryOptions.sort()
    if(categoryOptions.length == 0 || categoryOptions[0] == undefined){
      console.error("Products doesn't containt type: ", type)
      return 0;
    }else{
      return categoryOptions;
    }
  }
  // create UI filters for every passed filter option
  createShopFilters(filters){
    let sideShopFilters_div = document.createElement('div')
    filters.forEach(filter => {      
      sideShopFilters_div.appendChild(this.createCheckButtons(...[this.createFilterCategory(filter),filter]))
    })
    return sideShopFilters_div
  }
  // !!!!!!!!!!! UNDER CONSTRUCTION
  filterProducts(filterKeys){
    this.products.forEach(product => {
    })

    this.filteredProducts = this.products.filter(product => {
      // product[]
    })

    this.products.forEach(product => {

      if(Array.isArray(product[`${type}`])){
        product[`${type}`].forEach(item => {
          if(!categoryOptions.includes(item))
            categoryOptions.push(item)
        })
      }else if(!categoryOptions.includes(product[`${type}`])){
        categoryOptions.push(product[`${type}`])
      }
    })
    categoryOptions.sort()
    console.log('category options',categoryOptions)
    if(categoryOptions.length == 0 || categoryOptions[0] == undefined){
      console.error("Products doesn't containt type:", type) 
      return 0;
    }else{
      return categoryOptions;
    }
  }
  // !!!!!!!!!!!

}

// shop initialization
async function init(){
  let shopGridWrapper = document.getElementById("products-wrapper")
  let modalWrapper_div = document.getElementById("optionModal")
  let shopFilters_div = document.getElementById("shop-filters")
  
  // create cart instance 
  let cart = new Cart();
  // fetch products from API
  let products = await fetchProducts();
  // create Shop User Interface 
  const shopUI = new ShopProductsUI(products);
  // add User Interface to DOM
  shopGridWrapper.appendChild(shopUI.getShopGrid());
  // create and add modal UI to DOM
  let modalOptions = shopUI.getModalOptions();
  modalWrapper_div.appendChild(modalOptions)
  // listen for btn-choose-option  
  document.addEventListener('click',() => {
    if(event.target.classList.value == "btn-choose-options") 
      showOptionsModal() 
  })
  // add eventlistener for modal button add to cart
  document.getElementById('add-to-cart-btn').addEventListener('click',() =>
    addToCart(products[event.target.dataset.id - 1 ], cart)
  )
  // create shop filters UI instance
  let shopfilterUI = new ShopFilterUI(products)
  // pass desired filter categories
  let productFilterCategories = ['gender', 'style', 'colors', 'sizes', 'features']
  // extract options from product for passed categories, generate ui and add to DOM
  shopFilters_div.appendChild(shopfilterUI.createShopFilters(productFilterCategories))
  
  // !!!!!!!!!!! UNDER CONSTRUCTION
  document.querySelectorAll('[class*="-checkbox"] > input').forEach( checkbox => {
    checkbox.addEventListener('change', filterChanged)
  })
    
  console.log('filtered: ',filterPlainArray(products,filters))  

  // !!!!!!!!!!! 
}

class Modal{
  
}

function createRadioButtons(data, type){
  let singleBreak = '<div class="w-100"></div>';
  let radioWrap_div = document.createElement('div');
  
  let radioTitle_h6 = document.createElement('h6')
  radioTitle_h6.textContent = `Select ${type}:`
  radioWrap_div.appendChild(radioTitle_h6)

  radioWrap_div.innerHTML += singleBreak;
    
  let radioButtonsWrap_div = document.createElement('div');
  radioButtonsWrap_div.classList.add('d-flex','flex-row')

  data.forEach((item, index) => {
    let radioButtonWrap_div = document.createElement('div')
    console.log(typeof item, item)
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

    // radioWrap_div.innerHTML += singleBreak;

  return radioWrap_div;
}

function showOptionsModal(){
  let button = event.target
  // extract info from button data-* attributes
  let colors = button.dataset.colors 
  let sizes = button.dataset.sizes
  let title = button.dataset.title
  let id = button.dataset.id
  // convert data strings to arrays
  colors = colors.split(",")
  sizes = sizes.split(",")
  console.log(colors)
  showModall()
  
  document.getElementById('modal-options-title').textContent = title
  document.getElementById('add-to-cart-btn').dataset.id = id
  let modalBody = document.getElementById('modal-options-body')
  modalBody.innerHTML = ""
  document.getElementById('modalalert').display = "none";  
  
  let modalThumb_img = document.createElement('img')
  modalThumb_img.src = `/img/shoe${id}_1.jpg`
  modalBody.appendChild(modalThumb_img)
  
  let radioButtons = document.createElement('div')

  radioButtons.appendChild(createRadioButtons(colors, 'color'))
  radioButtons.appendChild(createRadioButtons(sizes, 'size'))

  modalBody.appendChild(radioButtons)
  
}

function addToCart(product, cart){
  
  // on add to cart click check which radio buttons are selected
  let modalAlert = document.getElementById('modalalert')
  let radiocolors = document.getElementsByName('color')
  let radiosizes = document.getElementsByName('size') 
  
  let clr, siz
  radiocolors.forEach(radio => {
    if(radio.checked){
      clr = radio.value
    }        
  })
  radiosizes.forEach(radio => {
    if(radio.checked){
      siz = radio.value
    }        
  })
  // check if customer selected size and color
  if(!(clr && siz)){
    modalAlert.innerHTML = 'You have to select color and size to add product to cart'
    modalAlert.style.display = "block"
  }else{
    
    cart.addItemToCart(product, siz, clr);
    console.log('add to cart', executingAt())
    closeOptionsModal()
    
  }
}



async function fetchProducts() {
  const dataURL =
  "https://raw.githubusercontent.com/urosradosavljevic/testing-data/master/product.json"
  try{
    let response = await fetch(dataURL)
    let data = await response.json()
    return data;
  }catch(err){
    console.log("Fetch Error. Status Code: ", err )
  }
}

// initialize UI when content is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
})

function checkkk(productFilterOption){
  let checked = []
  productFilterOption.forEach(key => {
    let buttons = document.querySelectorAll(`input[name="${key}"]:checked`)
    // console.log('buttons', buttons)
    checked[key] = []
    buttons.forEach(button => {
      checked[key].push(button.value)
    });
  })
  // console.log(checked)
}

function filterChanged(){
  let filterName = event.target.name
  let filterValue = event.target.value

  let activeFilter = []

  let searchParameters = new URLSearchParams(
    document.location.search.substring(1)
  );
  
  console.log(activeFilter)

  if(event.target.checked){
    
    searchParameters.append(`${filterName}`,`${filterValue}`)
    // searchParameters.forEach(function(value, key) {
    //   console.log('ds',key, value);
    // });
    console.log(searchParameters.toString())
    window.history.pushState("object or string", "Title", `shop.html?${searchParameters.toString()}`);
  }else{
    // searchParameters.delete(`${name}`,`${value}`)
      if(filterName == name && filterValue == value){

      }else{
        searchParameters.append(`${name}`,`${value}`)
      }
    console.log(searchParameters.toString())
    window.history.pushState("object or string", "Title", `shop.html?${searchParameters.toString()}`);
  }
}

const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);


function filterPlainArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores an empty filter
      if (!filters[key].length) return true;
      // console.log('filter: ', filters[key])
      // console.log('filter key: ', filterKeys)
      return filters[key].find(filter => {
        // console.log('filter value: ', getValue(filter) ,'item[key] value: ', getValue(item[key]))
        getValue(filter) === getValue(item[key])
      });
    });
  });
}
