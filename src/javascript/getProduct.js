document.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(document.location.search);
  let productId = params.get("sku");

  //  Category container & template
  let categorypathContainer = document.querySelector(".categoryPath");
  const categorypathTemplate = document.querySelector(".categorypathTemplate");

  //  Product container & template
  let productContainer = document.querySelector(".productContainer");
  const productTemplate = document.querySelector(".productTemplate");

  fetch(`https://hifi-corner.herokuapp.com/api/v1/products/${productId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      //  Category path creation
      const clonePath = categorypathTemplate.content.cloneNode(true);
      clonePath.querySelector(".categoryPath__second").innerText = data.category;
      clonePath.querySelector(".categoryPath__third").innerText = data.make;
      categorypathContainer.appendChild(clonePath);

      //  Product creation
      const clone = productTemplate.content.cloneNode(true);
      clone.querySelector(".productContainer__img").src = data.images[0];
      clone.querySelector(".moreImgContainer__img").src = data.images[0];
      clone.querySelector(".moreImgContainer__img1").src = data.images[0];
      clone.querySelector(".productContainer__bottomDescriptionText").innerText = data.description;
      clone.querySelector(".descriptionContainer__header").innerText = `${data.make} ${data.model}`;
      clone.querySelector(".linkPriceContainer__link").innerText = `See other ${data.make} products`;
      clone.querySelector(".linkPriceContainer__price").innerText = `${data.price}kr`;
      clone.querySelector(".grid1").innerText = data.make;
      clone.querySelector(".grid2").innerText = data.model;
      productContainer.appendChild(clone);
    });
});
