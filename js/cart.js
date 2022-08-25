cartData=''
allproductsdata=''
let total=0
 url = window.localStorage.getItem('url')
let user = window.localStorage.getItem('user')
document.getElementById("cartheading").innerHTML= `Welcome   `  + user + ` finalize your purchase!`

function LOAD() {
    console.log(user)
    if (user != null) {
        $.ajax({
            url: url + "/shoe",
            type: "GET",
            success: (posRes) => {
                allproductsdata = posRes
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    }
    else
    document.write('<h3 style="font-family: Dancing Script, cursive; color:#ffffff; padding-left:550px;padding-top:10px"> Unauthorised User' + '</h3>');
}

LOAD()

function cart(){
    console.log(user) 
    $.ajax({
        url: url + "/cart" + "?q=" + user,
        type: "GET",
        success: (posRes) => {
            let cartData = posRes
            console.log("Cart data:- ",cartData)
            let x = '<div class = "row">'
            for (let i = 0; i < cartData.length; i++) {     
                if (cartData[i].byed == 0) {    
                    for (let j = 0; j < allproductsdata.length; j++) {   
                        if (allproductsdata[j].p_id == cartData[i].p_id) {   
                            let obj = allproductsdata[j]
                            total += parseInt(obj.discountedprice * cartData[i].qty)
                            x = x + `
                            <div class="col-lg-4" >
                            <div class="card" style="margin-top: 30px;" >
                            <img class="card-img-top zoom" src="${obj.imgsrc}"  alt="Card image cap">
                           <div class="card-body">
                            <h5 class="card-title text-dark">${obj.name}</h5>
                                        <p class="card-text text-muted">${obj.type}</p>
                                        <div>
                                        <p  class="card-text text-danger" style="float:left">${obj.price}</p>
                                        <p class="card-text text-dark" style="float:right ; padding-right:100px"><s>${obj.discountedprice}</s></p>
                                      </div>
                            </div>
                            <h5 style="margin-left:25px; color:#9074d3"> Quantity &nbsp; ${cartData[i].qty}</h5>   
                <div>
                <button onclick="addFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn" style="border:solid 1px; border-color:##c6b4ef ; color:#9074d3 ;margin-left:28px"><i class="fa-solid fa-plus"></i></button>
                <button onclick="reduceFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn" style="border:solid 1px; border-color:##c6b4ef ; color:#9074d3; margin-left:15px"><i class="fa-solid fa-minus"></i></button>
                            </div>
                            </div>
               </div>
                                `
                        }
                    }
                }
            }
            x = x + `</div>`
            document.getElementById('cart2').innerHTML = x
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })
}
cart()

function reduceFromCart(id, qty, p_id) {
    if(qty == 1)
    {
        $.ajax({
            url : url+"/cart/"+id,
            type : "DELETE",
            success : (posRes) =>{
                console.log(posRes)
            },
            error : (errRes) =>{
                console.log(errRes)
            }
        })
    }
    else
    {
        let data = {}
        data.qty = qty - 1
        data.id = id
        data.p_id = p_id
        data.user = user
        data.byed = 0
        $.ajax({            
            url : url+"/cart/"+id,
            type : "PUT",
            data : data,
            success : (posRes) =>{
                console.log(posRes)
            },
            error : (errRes) =>{
                console.log(errRes)
            }
        })
    }
    cart()
}
function addFromCart(id, qty, p_id){


    let data = {}
    data.qty = qty + 1
    data.id = id
    data.p_id = p_id
    data.user = user
    data.byed = 0
    $.ajax({            
        url : url+"/cart/"+id,
        type : "PUT",
        data : data,
        success : (posRes) =>{
            console.log(posRes)
        },
        error : (errRes) =>{
            console.log(errRes)
        }
    })

    cart()

}

function logout()
{
        alert("You have been Logged out, Thank You!")
        window.localStorage.clear()
        window.close()
}

