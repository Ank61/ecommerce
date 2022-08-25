cartData=''
allproductsdata=''
clothdata=''
let aftergst=0
let total=0
 url = window.localStorage.getItem('url')
 let user =window.localStorage.getItem('user')

function shirtload() {
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

shirtload()


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
                        console.log("The clothe data is",clothdata)
                        if (allproductsdata[j].p_id == cartData[i].p_id ) {  
                            console.log("I m in cartdata") 
                            let obj = allproductsdata[j]
                            total += parseInt(obj.price * cartData[i].qty)
                            aftergst = total + (total* 0.12)
                            console.log("I m in all products")
                            x = x + `
                            <div class="col-lg-6" >
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
                <button onclick="addFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn" style="border:solid 1px; border-color:##c6b4ef ; color:#9074d3 ;margin-left:28px; margin-bottom:5px;"><i class="fa-solid fa-plus"></i></button>
                <button onclick="reduceFromCart(${cartData[i].id},${cartData[i].qty},${cartData[i].p_id})" class="btn" style="border:solid 1px; border-color:##c6b4ef ; color:#9074d3; margin-left:15px; margin-bottom:5px;"><i class="fa-solid fa-minus"></i></button>
                            </div>
                            </div>
               </div>
                                `
                        }
                    }
                }
            }
            x = x + `</div>`
            document.getElementById('cartdisplay1').innerHTML = x
            document.getElementById('total1').innerHTML = "Cost = "+total
            document.getElementById('gst1').innerHTML = "GST  =  12%"
            document.getElementById('aftergst1').innerHTML = "Total Amount = " + aftergst
            
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


function logout(){   
    alert("You have been Logged out, Thank You!")
    window.localStorage.clear()
    window.close()
}
function checkout(){
    alert("Thank You For Shopping")
    window.localStorage.clear()
    window.open('../index.html')
    window.close()

}