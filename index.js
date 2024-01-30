// Get All Products

async function getAllproducts() {
  let str = "";
  let response = await axios.get("https://fakestoreapi.com/products?limit=9");
  //console.log(response.data)
  /* data is a key*/
  response.data.forEach((items, index) => {
    str += `
   
    <div class="col-sm-4 mt-4 mb-4  js-content">
    <div class="card " style="width:300px ">
        <img class="card-img-top img-fluid" src="${items.image
      }" height="200px" alt="Card image"  >
        <div class="card-body ">
          <h4 class="card-title ">Title:- ${items.title.slice(0, 5)}</h4>
          <p class="card-text">Category:-${items.category}</p>
          <p class="card-text"> Description:-${items.description.slice(0, 10)}</p>
          
          <a href="#" class="btn btn-primary" onclick = 'alldetails(${items.id
      })'>Read More</a>
          <a href="#" class="btn btn-success ml-2" onclick = 'addcart(${items.id
      })'><span "><i class="fa-solid fa-bag-shopping pr-2" style="color: #fff;"></i><span>Add Cart</a>

        </div>
      </div></div>
      
      `;
  });
  document.getElementById("users").innerHTML = str;
}
getAllproducts();

// ----------------------------------------------------------------------------


/* get all category*/
async function getAllcategory() {
  let catstr = "";
  let res = await axios.get("https://fakestoreapi.com/products/categories");
  res.data.forEach((items) => {
    catstr += ` 
              <a class="dropdown-item" href="#"  onclick ='getsinglecatvalue(this.innerText)'>${items}</a>
             
          </div>`;
  });
  document.getElementById("category").innerHTML = catstr;
}
getAllcategory();

// ----------------------------------------------------------------------------

///single category product data
async function getsinglecatvalue(categoryname) {
  let str = "";
  let response = await axios.get(`https://fakestoreapi.com/products/category/${categoryname}`);
  //console.log(response.data)
  /* data is a key*/
  response.data.forEach((items, index) => {
    str += `<div class="col-sm-4 mt-3 mb-4 js-content"><div class="card" style="width:300px ">
        <img class="card-img-top img-fluid" src="${items.image
      }" height="200px" alt="Card image"  >
        <div class="card-body">
          <h4 class="card-title ">Title: ${items.title.slice(0, 10)}</h4>
          <h6 class="card-text">Category: ${items.category}</h6>
          <p class="card-text">Description: ${items.description.slice(
        0,
        10
      )}</p>
          <a href="#" class="btn btn-primary" onclick = 'alldetails(${items.id})'>Read More</a>
          <a href="#" class="btn btn-success" onclick = 'addcart(${items.id})'>Add Cart</a>
          </div>
</div></div>`;
    // console.log(response);
  });
  document.getElementById("users").innerHTML = str;
  // view port modal-box
}
/*async function alldetails(id){
  console.log(id)
  let str = '';
  let read = await axios.get(`https://fakestoreapi.com/products/${id}`)
 
   str = read.data
  let res =`
       <div class="card"style="width:300px ">
      
        <img class="card-img-top img-fluid  'height=100px' 'width=300px' " src="${str.image}"width alt="Card image"  >
        <div class="card-body">
          <h4 class="card-title ">Title:${str.title}</h4>
          <h6 class="card-text">Category:${str.category}</h6>
          <p class="card-text">Description:${str.description.slice(0,30)}</p>
        <h6 class="card-text">Price:${str.price}</h6>
          <h6 class="card-text">Rate:${str.rating.rate}</h6>
          <h6 class="card-text">Count:${str.rating.count}</h6>
        
      </div></div>
      <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    </div>
        </div>`
  console.log(res)

  document.getElementById("viewport").innerHTML = res;
}*/

// ----------------------------------------------------------------------------

/*view port local-storge*/
async function alldetails(id) {
  //console.log(pid);
  let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  localStorage.setItem("ecommerce_single_data", JSON.stringify(res.data));
  window.location = "singleproduct.html";
}


// ----------------------------------------------------------------------------


function getSingleProduct() {
  let data = localStorage.getItem("ecommerce_single_data");
  // console.log(data);
  if (data != null) {
    product_result = JSON.parse(data);
  } else {
    product_result = null;
  }
  //console.log(product_result);
  let x = ` 
    <div class="col-sm-4"><img src="${product_result.image}" class='img-fluid'/></div>
    <div class="col-sm-8 pt-5">
    <h6 Title:-${product_result.title}</h6>
      <p>Category:-${product_result.category}</p>
      <p> Description:-${product_result.description}</p>
      <p>Price:-${product_result.price}</p>
      <p>Rate:-${product_result.rating.rate}</p>
      <a href="#" class="btn btn-success" onclick = 'addcart(${product_result.id})'>Add Cart</a>

    
  </div>`;
  document.getElementById("single_products").innerHTML = x;
}
getSingleProduct();

// ----------------------------------------------------------------------------




/* Add Cart data*/
function addcart(cartid) {
  let pid = cartid;
  let add_data = localStorage.getItem("add_data_cart");
  if (add_data != null) {
    arr = JSON.parse(add_data);
  } else {
    arr = [];
  }


  let newarr = arr.filter((items) => {
    return items == cartid;
  });
  if (newarr.length > 0) {
    alert("already added !");
  } else {
    arr.push(cartid);
  }

  localStorage.setItem("add_data_cart", JSON.stringify(arr));
  cartdatacount()
}


// ----------------------------------------------------------------------------

/* count cart*/

function cartdatacount() {
  let adddata = localStorage.getItem("add_data_cart");
  /*console.log(adddata)*/
  if (adddata != null) {
    arr = JSON.parse(adddata);
  } else {
    arr = [];
  }
  //console.log(arr)
  let coun = arr.length;
  console.log(coun)

  document.getElementById("cartshow").innerHTML = coun;

}
cartdatacount();

// ----------------------------------------------------------------------------

/* ADD CART TO SHOW*/
function cart_show_data(pid) {

  let cart_show = localStorage.getItem("add_data_cart");
  // console.log(cart_show);
  window.location = "add_cart.html";
  add_cart()
}

async function add_cart() {
  let str = ""
  let cart_show = localStorage.getItem("add_data_cart");
  console.log(cart_show)
  if (cart_show != null) {
    arr = JSON.parse(cart_show)
  }
  else {
    arr = [];
  }
  let cart = []
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(arr));
  }
  saveCart();

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  let x = '';
  arr.filter(async (items) => {
    let res = await axios.get(`https://fakestoreapi.com/products/${items}`)
  })
  let newarr = arr.forEach((items) => {

    x += ` 
       <div class="col-sm-4"><img src="${items.data.image}" class='img-fluid'/></div>
       <div class="col-sm-8 pt-5">
       <h6 Title:-${product_result.title}</h6>
         <p>Category:-${product_result.category}</p>
         <p> Description:-${product_result.description}</p>
         <p>Price:-${product_result.price}</p>
         <p>Rate:-${product_result.rating.rate}</p>
         <a href="#" class="btn btn-success" onclick = 'addcart(${product_result.id})'>Add Cart</a>
     
       
     </div>`;
  })



  console.log(x)

}
add_cart()


