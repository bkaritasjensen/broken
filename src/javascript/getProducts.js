document.addEventListener("DOMContentLoaded", () => {
  //  Search for category in URL
  let params = new URLSearchParams(window.location.search);
  let productCategory = params.get("product_category");

  //  Category list & container
  const categoryContainer = document.querySelector(".productsBackground__categories");
  const productCountContainer = document.querySelector(".showBtnContainer__items");

  //  Path for the category & model
  const categoryElement = document.querySelector(".categoryPath__second");
  const categoryHeader = document.querySelector(".productsContainer__header");

  //  Manufacturer list & container
  const titleManufacturer = document.querySelector(".manufacturers__titles");
  const manufacturer = document.querySelector(".filter__manufacturersContainer");

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
  }

  //  Count Products
  function countProducts(e){
    let countProducts = e.length;
    productCountContainer.innerText = `${countProducts} item(s)`;
  }

  //  Fetch data from API
  fetch("https://hifi-corner.herokuapp.com/api/v1/products")
    .then(response => response.json())
    .then(function(data) {

      // Conditional statement, show all products or specific category.
      if (productCategory) {
        const product = data.filter(function(e) {
          return e.category === productCategory;
        });
        countProducts(product);
        createEachProduct(product);
      } else {
        countProducts(data);
        createEachProduct(data);
      }

      //  Current Category
      categoryElement.innerHTML = productCategory;
      categoryHeader.innerHTML = productCategory;

      //  Create categories
      const arr = data.map(product => product.category);
      function getUnique(arr) {
        return arr.filter((e, i) => arr.indexOf(e) >= i)
      };
      getUnique(arr).forEach(item => {
        categoryContainer.innerHTML += 
        `<li class="categories__category"><a href="/products/index.html?product_category=${item}" class="category__link ${item}">${item}</a></li>`;
      });

      //  Create Manufacturer list
      const manufacturerArr = data.map(product => product.make);
      getUnique(manufacturerArr).forEach(item => {
        manufacturer.innerHTML += `<li class="manufacturersContainer__container"><a href="" class="manufacturersContainer__manufacturer">${item}</a></li>`;
        titleManufacturer.innerHTML += `<li class="title__manufacturer"><a href="" class="manufacturer__link ${item}">${item}</a></li>`;
      });
    });
});
