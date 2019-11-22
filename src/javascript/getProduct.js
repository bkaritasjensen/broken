document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(document.location.search);
    let productId =  params.get("sku");
    let mainElement = document.querySelector(".productContainer");
    let topElement = document.querySelector('.categoryPath');
    const categorypathTemplate = document.querySelector('.categorypathTemplate')
    const productTemplate = document.querySelector('.productTemplate')
    
    fetch(`https://hifi-corner.herokuapp.com/api/v1/products/${productId}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        /* console.log(productId.category) */

        const clone = categorypathTemplate.content.cloneNode(true);
        clone.querySelector('.categoryPath__second').innerText = data.category;
        clone.querySelector(".categoryPath__third").innerText = data.make;
        topElement.appendChild(clone);
            mainElement.innerHTML = `
            <img
            src="${data.images[0]}"
            alt=""
            class="productContainer__img"
          />
          <p class="productContainer__imgText">MORE VIEWS</p>
          <figure class="productContainer__moreImgContainer">
            <img
              src="${data.images[0]}"
              alt=""
              class="moreImgContainer__img"
            />
            <img
              src="${data.images[0]}"
              alt=""
              class="moreImgContainer__img"
            />
          </figure>
          <h4 class="productContainer__bottomDescriptionHeader">DESCRIPTION</h4>
          <p class="productContainer__bottomDescriptionText">${data.description}</p>
          <section class="productContainer__descriptionContainer">
            <h3 class="descriptionContainer__header">${data.make} ${data.model}</h3>
            <div class="descriptionContainer__linkPriceContainer">
              <a href="" class="linkPriceContainer__link"
                >See other ${data.make} products</a
              >
              <h3 class="linkPriceContainer__price">${data.price}</h3>
            </div>
            <p class="descriptionContainer__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, non.
              Porro corporis quaerat laudantium impedit amet, eos dolores
              voluptatibus recusandae!
            </p>
            <div class="descriptionContainer__productBtnContainer">
              <button class="productBtnContainer__btn">Ask a question</button>
              <button class="productBtnContainer__btn">Part exchange</button>
              <button class="productBtnContainer__btn">Pay by finance</button>
              <button class="productBtnContainer__btn">Seen a better price?</button>
            </div>
          </section>
          <div class="productContainer__buyBox">
            <h5 class="buyBox__h5">Finish</h5>
            <div class="buyBox__radioContainer">
              <label class="radioContainer__radio">
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark"></span>
                Black
              </label>
              <label class="radioContainer__radio">
                <input type="radio" name="radio" />
                <span class="checkmark"></span>
                Silver
              </label>
            </div>
            <div class="buyBox__qtyContainer">
              <label for="qty" class="qtyContainer__qtyText"
                >Qty:
                <input type="number" name="qty" id="" class="qtyContainer" />
              </label>
              <button class="qtyContainer__button">Add to cart</button>
            </div>
          </div>
          <div class="productContainer__addInfo">
            <h2 class="addInfo__header">additional information</h2>
            <div class="addInfo__contentContainer">
              <p class="contentContainer__infoKey">Manufacturer</p>
              <p class="contentContainer__infoKey">Model</p>
              <p class="contentContainer__infoKey">Free warranty</p>
              <p class="contentContainer__infoKey">Delivery charge</p>
              <p class="contentContainer__infoKey">Delivery time</p>
              <p class="contentContainer__infoKey">Card surcharges</p>
              <p class="contentContainer__infoValue grid1">${data.make}</p>
              <p class="contentContainer__infoValue grid2">${data.model}</p>
              <p class="contentContainer__infoValue grid3">3 years</p>
              <p class="contentContainer__infoValue grid4">Free</p>
              <p class="contentContainer__infoValue grid5">1 - 5 Working Days</p>
              <p class="contentContainer__infoValue grid6">No</p>
            </div>
          </div>
            `
        });
    });



    e.forEach(function(product) {
      const clone = productsTemplate.content.cloneNode(true);
      clone.querySelector(".product__header").innerText = `${product.make} ${product.model}`;
      clone.querySelector("img").src = product.images[0];
      clone.querySelector(".product__price").innerText = `${product.price} kr`;
      clone.querySelector("a").href = `/product/?sku=${product.sku}`;
      list.appendChild(clone);
    });