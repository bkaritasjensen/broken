// Create each product in products
/* export function createEachProduct(e){
    e.forEach(function(product) {
        const clone = productsTemplate.content.cloneNode(true);
        clone.querySelector(".product__header").innerText = `${product.make} ${product.model}`;
        clone.querySelector("img").src = product.images[0];
        clone.querySelector(".product__price").innerText = `${product.price} kr`;
        clone.querySelector("a").href = `/product/?sku=${product.sku}`;
        list.appendChild(clone);
      });
} */

function hi(){
  console.log("hello!")
}

function bye(){
  console.log("Bye!")
}

export {hi, bye};
