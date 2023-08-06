const btnCart = document.querySelector('#cart-icon');
const cart =document.querySelector('.cart');


document.addEventListener('DOMContentLoaded',loadFood);


function loadFood()
 {
    loadContent();
 }

 function loadContent()
  {
    // remove items from cart

    let btnRemove =document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => 
        {
           btn.addEventListener('click',removeItem)
           updateTotal()
        });
        // product Items change
    let productQut = document.querySelectorAll('.card-quantity');
    productQut.forEach((input)=>
     {
        input.addEventListener('change',changeQut)
     });

    //  button function

    let cartBtn = document.querySelectorAll('.addCart');
    cartBtn.forEach((btn)=>
    {
        btn.addEventListener('click',btnfunction)
        updateTotal();
    })
       
  }

   // remove Item
   function removeItem()
   {
    if(confirm("Are You Sure to Remove Item"))
     {
        let title = this.parentElement.querySelector('.cart-things').innerHTML;
         itemsList =itemsList.filter(el=>title!=title);
        this.parentElement.remove();
        loadContent();
     }
   }

    // product Item change

   function changeQut()
    {
        if(isNaN(this.value) || this.value<1)
        {
           this.value=1;
        }
        loadContent();
    }
   let itemsList=[];
    // button Function
    function btnfunction()
    {
     let products = this.parentElement;
     let title = products.querySelector('.product-title').innerHTML;
     let price = products.querySelector('.prize').innerHTML;
     let imgsrc = products.querySelector('.product-img').src;
     let newproduct ={title,price,imgsrc}
    //  check product already exit cart
    if(itemsList.find((el)=>el.title==newproduct.title))
    {
           alert("product already added");
           return
    } 
    else
     {
itemsList.push(newproduct)
     }
    
    

     let newProductElement = createCartProduct(title,price,imgsrc);

     let element = document.createElement('div');
     element.innerHTML=newProductElement;
     let cartBasket =document.querySelector('.cart-contents');
     cartBasket.append(element);
     loadContent();

    // console.log(title,price,imgsrc)
    updateTotal()
    
    }

    function createCartProduct(title,price,imgsrc)
     {
       return `

                       <div class="cart-box" >

                                <div class="detail-box">
                                <img src="${imgsrc}" alt="">
                                    <div class="cart-things">${title}</div>
                                    <div class="price-box">
                                        <div class="cart-price">${price}</div>
                                        <div class="cart-amt">${price}</</div>
                                    </div><br>
                                
                                        <input type="number" value="1" class="card-quantity" style="width: 50px;" >
                                </div>
                                <ion-icon name="trash" class="cart-remove" ></ion-icon>

                        </div>
               `;
     }

     function  updateTotal()
      {
        let cartItems = document.querySelectorAll('.cart-box');
        let totalvalue = document.querySelector('.total-price');
        let total=0;
        cartItems.forEach(product=>
            {
                let priceElememnt =product.querySelector('.cart-price');
                let price =parseFloat(priceElememnt.innerHTML.replace("$", ""));
                let qty = product.querySelector('.card-quantity').value;
                total+=(price*qty);
                product.querySelector('.cart-amt').innerText="Rs."+ (price*qty)
              
                
            });
            totalvalue.innerHTML="Rs."+total;
            document.querySelector('.cart-count').innerHTML=itemsList.length;
            const iconscount = document.querySelector('.cart-count');
        const count = itemsList.length;
        iconscount.innerHTML =count;

            if(count == 0)
            {
                iconscount.style.display="none";
            }
            else
            {
                iconscount.style.display="block";
            }
           
      }
    
   



