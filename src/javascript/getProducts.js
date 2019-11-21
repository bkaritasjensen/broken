document.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(window.location.search);
  let productCategory = params.get("product_category");
  let categoryContainer = document.querySelector(
    ".productsBackground__categories"
  );
  let productCountContainer = document.querySelector(
    ".showBtnContainer__items"
  );

  let titleManufacturer = document.querySelector(".manufacturers__titles");
  let manufacturer = document.querySelector(".filter__manufacturersContainer");

  const productsTemplate = document.querySelector(".productsTemplate");
  const list = document.querySelector(".productsContainer__productContainer");

  let categoryElement = document.querySelector(".categoryPath__second");
  let categoryHeader = document.querySelector(".productsContainer__header");


  fetch("https://hifi-corner.herokuapp.com/api/v1/products")
    .then(response => response.json())
    .then(function(data) {
      console.log(data)
      if (productCategory) {
        const product = data.filter(function(e) {
          return e.category === productCategory;
        });
        
        // Create each product
        product.forEach(function(product) {
          const clone = productsTemplate.content.cloneNode(true);
          clone.querySelector(
            ".product__header"
          ).innerText = `${product.make} ${product.model}`;
          clone.querySelector("img").src = product.images[0];
          clone.querySelector(
            ".product__price"
          ).innerText = `${product.price} kr`;
          clone.querySelector("a").href = `/product/?sku=${product.sku}`;
          list.appendChild(clone);
        });

        //  Count products
        let countProducts = product.length;
        productCountContainer.innerText = `${countProducts} item(s)`;
      } else {
        //  Count products
        let countProducts = data.length;
        productCountContainer.innerText = `${countProducts} item(s)`;

        data.forEach(function(product) {
          const clone = productsTemplate.content.cloneNode(true);
          clone.querySelector(
            ".product__header"
          ).innerText = `${product.make} ${product.model}`;
          clone.querySelector("img").src = product.images[0];
          clone.querySelector(
            ".product__price"
          ).innerText = `${product.price} kr`;
          clone.querySelector("a").href = `/product/?sku=${product.sku}`;
          list.appendChild(clone);
        });
      }

      // Current Category
      categoryElement.innerHTML = productCategory;
      categoryHeader.innerHTML = productCategory;

      // Create categories
      let arr = [];
      data.forEach(product => {
        return arr.push(product.category);
      });
      function getUnique(arr) {
        return arr.filter((e, i) => arr.indexOf(e) >= i);
      }
      getUnique(arr).forEach(item => {
        categoryContainer.innerHTML += `<li class="categories__category"><a href="/products/index.html?product_category=${item}" class="category__link ${item}">${item}</a></li>`;
      });

      // Create Manufacturer list
      let manufacturerArr = [];
      data.forEach(product => {
        return manufacturerArr.push(product.make);
      });
      getUnique(manufacturerArr).forEach(item => {
        manufacturer.innerHTML += `<li class="manufacturersContainer__container"><a href="" class="manufacturersContainer__manufacturer">${item}</a></li>`;
        titleManufacturer.innerHTML += `<li class="title__manufacturer"><a href="" class="manufacturer__link ${item}">${item}</a></li>`;
      });
    });
});
