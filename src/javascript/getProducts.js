document.addEventListener("DOMContentLoaded", () => {
  //  Search for category, brands & price in URL
  let params = new URLSearchParams(window.location.search);
  let productCategory = params.get("product_category");
  let productBrand = params.get("product_make");

  //  Category list & container
  const categoryContainer = document.querySelector(".productsBackground__categories");
  const productCountContainer = document.querySelector(".showBtnContainer__items");

  //  Path for current category & model
  const categoryElement = document.querySelector(".categoryPath__second");
  const categoryHeader = document.querySelector(".productsContainer__header");

  //  Brands list & container
  const titleBrands = document.querySelector(".manufacturers__titles");
  const brandsContainer = document.querySelector(".filter__manufacturersContainer");

  //  Products template & container
  const productsTemplate = document.querySelector(".productsTemplate");
  const list = document.querySelector(".productsContainer__productContainer");

  //  Create products from template and inject to container
  function createEachProduct(e) {
    e.forEach(function(product) {
      const clone = productsTemplate.content.cloneNode(true);
      clone.querySelector(".product__header").innerText = `${product.make} ${product.model}`;
      clone.querySelector("img").src = product.images[0];
      clone.querySelector(".product__price").innerText = `${product.price} kr`;
      clone.querySelector("a").href = `/product/?sku=${product.sku}`;
      list.appendChild(clone);
    });
  };

  //  Count Products
  function countProducts(e){
    let countProducts = e.length;
    productCountContainer.innerText = `${countProducts} item(s)`;
  };

  //  Sorting to only one kind of each item
  function getUnique(arr) {
    return arr.filter((e, i) => arr.indexOf(e) >= i)
  };

  //  Fetch data from API
  fetch("https://hifi-corner.herokuapp.com/api/v1/products")
    .then(response => response.json())
    .then(function(data) {

      // Conditional statement, show all products or specific category / brand.
      if (productCategory) {
        const product = data.filter(function(e) {
          return e.category === productCategory;
        });
        countProducts(product);
        createEachProduct(product);
      } 
      else if(productBrand) {
        const product = data.filter(function(e) {
          return e.make === productBrand;
        });
        countProducts(product);
        createEachProduct(product);
      } 
      else {
        countProducts(data);
        createEachProduct(data);
      }

      //  Current Category
      categoryElement.innerHTML = productCategory;
      categoryHeader.innerHTML = productCategory;

      //  Create categories
      const arr = data.map(product => product.category);
      getUnique(arr).forEach(item => {
        categoryContainer.innerHTML += 
        `<li class="categories__category"><a href="/products/index.html?product_category=${item}" class="category__link ${item}">${item}</a></li>`;
      });

      //  Create Brands list
      const brandsArr = data.map(product => product.make);
      getUnique(brandsArr).forEach(item => {
        brandsContainer.innerHTML += `<li class="manufacturersContainer__container"><a href="/products/index.html?product_make=${item}" class="manufacturersContainer__manufacturer">${item}</a></li>`;
        titleBrands.innerHTML += `<li class="title__manufacturer"><a href="/products/index.html?product_make=${item}" class="manufacturer__link ${item}">${item}</a></li>`;
      });
    });
});
