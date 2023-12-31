let carts=document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'MDH garam masala',
        tag: 'mdh',
        price: '78',
        inCart: 0,
    },
    {
        name: 'Catch garam masala',
        tag:'catch',
        price: '75',
        inCart: 0,
    },
    {
        name: 'Everest garam masala',
        tag:'everest',
        price: '80',
        inCart: 0,
    },
    {
        name: 'Ketchup',
        tag:'ketch',
        price: '80',
        inCart: 0,
    },

]

for(let i=0;i<carts.length;i++){

  carts[i].addEventListener('click',() => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })  
}

/*function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textcontent = productNumbers;
    }
}*/

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers+1;
    }
     else
     {
        localStorage.setItem('cartNumbers',1);
      document.querySelector('.cart span').textContent=1;
    }
      setItems(product);
    
}


function setItems(product){

   let cartItems = localStorage.getItem('productsInCart');
   cartItems=JSON.parse(cartItems);
   console.log("My cartItems are",cartItems);
    
   if(cartItems!= null)
   {
      if(cartItems[product.name] == undefined)
      {cartItems = {
          ...cartItems,
          [product.name]:product
      }
    }
       cartItems[product.name].inCart += 1;
   } else{
   product.inCart=1;

     cartItems={
        [product.name]:product
    }
}
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
   
function totalCost(product){
// console.log("The product price is",product.price);

 let cartCost=localStorage.getItem('totalCost');
//console.log("My cartCost is",cartCost);
if(cartCost !=null)
{
    cartCost=parseInt(cartCost);
    product.price=parseInt(product.price);
    //console.log(typeof product.price)
    
    localStorage.setItem("totalCost", cartCost + product.price );
}else{
localStorage.setItem("totalCost",product.price);
}
}

function displayCart(){

    let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

let productContainer = document.querySelector(".products");
let cartCost = localStorage.getItem('totalCost');

 console.log(cartItems);
    if(cartItems && productContainer)
    {
        productContainer.innerHTML ='';
        Object.values(cartItems).map(item =>{
         productContainer.innerHTML += `
          <div class ="product">
          <ion-icon name="close-circle-outline"></ion-icon>
           
          <span>${item.name}</span>
          </div>
          <div class ="price">${item.price}</div>
          <div class="quantityf">${item.inCart}</div>
          <div class ="totalf">
          ${item.inCart * item.price}
         `
        });

        productContainer.innerHTML +=`
        <div class ="basketTotalContainer">
          <h4 class ="basketTotalTitle">
          Basket Total
          </h4>
          <h4 class="basketTotal"
           ${cartCost}
          </h4>
        `;
    }
}
 

 
 

//onLoadCartNumbers();
displayCart();