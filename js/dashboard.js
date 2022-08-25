gdata=''
clothdata=''
user = window.localStorage.getItem('user')
url = window.localStorage.getItem("url")


function dashboard(){
    console.log(user) 
    if (user != null) {
        document.write('<h3 style="font-family: Dancing Script, cursive; color:#ffffff; padding-left:550px;padding-top:10px">Welcome &nbsp;'  +user + '</h3>');
        $.ajax({
            url: url + "/shoe",
            type: "GET",
            success: (posRes) => {
                gdata = posRes
                let x = `<div class = "row">`
                for (let i = 0; i < gdata.length; i++) {

                    x = x + `
            <div class="col-sm-3" >
             <div class="card" style="margin-top: 30px;" >
             <img class="card-img-top zoom" src="${gdata[i].imgsrc}"  alt="Card image cap">
            <div class="card-body">
             <h5 class="card-title text-dark">${gdata[i].name}</h5>
                         <p class="card-text text-muted">${gdata[i].type}</p>
                         <div>
                         <p  class="card-text text-danger" style="float:left">${gdata[i].price}</p>
                         <p class="card-text text-dark" style="float:right ; padding-right:100px"><s>${gdata[i].discountedprice}</s></p>
                       </div>
             </div>
 <div>
             <button   class="btn btn-outline-primary btn-sm float-left" onclick="addtocart('${i}')" style="border-radius: 6px;width :125px;margin-left:15px;"  >Add To Cart &nbsp; <i class="fa-solid fa-heart"></i> </button>                    
             <button   class="btn btn-outline-danger btn-sm float-right" onclick="buynow('${i}')" style="border-radius: 6px;width :100px; margin-right:15px;" >Buy Now &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button> 
             <button   class="btn btn-outline-secondary btn-sm " data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false"  aria-controls="collapseExample" style="margin-top:10px;margin-bottom:10px;border-radius: 6px;width :230px; margin-left:15px; " >Learn More &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button>                          
             <div class="collapse" id="collapseExample${i}">
             <div class="card card-body">
               ${gdata[i].description}
             </div>
             </div>
</div>
             </div>
             </div>
                    `
                }
                x = x + `</div>`

            document.getElementById('shoe').innerHTML = x
            },
            error: (errRes) => {
                console.log(errRes)
            }
        })
    }
    else
    document.write('<h3 style="font-family: Dancing Script, cursive; color:#ffffff; padding-left:550px;padding-top:10px">Unauthorised User&nbsp;' + '</h3>');
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////



function addtocart(id)
{
    console.log("Product id:- ",id)
    let cqty = 0
    let cartData = []
    let ix = ''
    let cartid = ''
    $.ajax({
        url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
        type: "GET",
        success: (posRes) => {
            cartData = posRes
            for(let i = 0; i < cartData.length; i++)
            {                
                if(cartData[i].p_id == gdata[id].p_id && cartData[i].byed == 0)
                {                                 
                    console.log("Comparison success qty = ",cartData[i].qty)      
                    cqty = 1
                    ix = i
                    cartid = cartData[i].id                                                          
                }                
            }
            if(cqty == 1)   
            {
                console.log("Present")
                let data = {}
                data.uname = user
                data.p_id = gdata[id].p_id        
                data.qty = parseInt(cartData[ix].qty) + 1
                data.byed = 0
                $.ajax({            
                    url : url+"/cart/"+cartid,
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
            else    
            {
                console.log("Absent")
                let data = {}
                data.uname = user
                data.p_id = gdata[id].p_id 
                data.discountedprice = gdata[id].discountedprice       
                data.qty = 1
                data.byed = 0                    
                $.ajax({
                    url : url+"/cart",
                    type : "POST",
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
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })        
}
                             


function buynow(id)
{
    console.log(" This is buy now in dashboard 1")
    addtocart(id)
    window.open("../html/buynow.html",'_parent')
}
addtocart()

function logout(){   
    alert("You have been Logged out, Thank You!")
    window.localStorage.clear()
    window.close()
}

function shirt(){
    console.log(user) 
    $.ajax({
        url : "http://localhost:3000/clothes",
        type : "GET",
        success : (posRes) =>{
            clothdata = posRes
            let x = ``
            x=x+`
            <div class="row" >
            `
            for(let i = 0; i<clothdata.length;i++)
            {
                    x = x + `
                <div class="col-sm-3" >
                <div class="card" style="margin-top: 30px;" >
                <img class="card-img-top zoom" src="${clothdata[i].imgsrc}"  alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title text-dark">${clothdata[i].name}</h5>
                            <p class="card-text text-muted">${clothdata[i].type}</p>
                            <div>
                            <p  class="card-text text-danger" style="float:left">${clothdata[i].price}</p>
                            <p class="card-text text-dark" style="float:right ; padding-right:100px"><s>${clothdata[i].discountedprice}</s></p>
                          </div>
                </div>
<div>
                <button   class="btn btn-outline-primary btn-sm float-left" onclick="addtocartshirt('${i}')" style="border-radius: 6px;width :125px;margin-left:15px;"  >Add To Cart &nbsp; <i class="fa-solid fa-heart"></i> </button>                    
                <button   class="btn btn-outline-danger btn-sm float-right" onclick="buynowshirt('${i}')" style="border-radius: 6px;width :100px; margin-right:15px;" >Buy Now &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button>          
                <button   class="btn btn-outline-secondary btn-sm " data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false"  aria-controls="collapseExample" style="margin-top:10px;margin-bottom:10px;border-radius: 6px;width :230px; margin-left:15px; " >Learn More &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button>                          

                    <div class="collapse" id="collapseExample${i}">
                    <div class="card card-body">
                      ${clothdata[i].discription}
                    </div>
                    </div>
</div>
                </div>
                </div>
                `
                }
                
            x = x + `
            </div>
            `
            document.getElementById('shirtdisplay').innerHTML = x
        },
        error : (errRes) =>{
            console.log("Error is:- ",errRes.status)
        }

    })
}

shirt()

function buynowshirt(id)
{console.log("Hello this is buy now section in dashboard")
    addtocartshirt(id)
    window.open("../html/buynow.html",'_parent')
}
addtocartshirt()


function addtocartshirt(id)
{
    console.log("Product id:- ",id)
    let cqty = 0
    let cartData = []
    let ix = ''
    let cartid = ''
    $.ajax({
        url: url + "/cart" + "?q=" + user,  //get all products from cart for loggedin user
        type: "GET",
        success: (posRes) => {
            cartData = posRes
            for(let i = 0; i < cartData.length; i++)
            {                
                if(cartData[i].p_id == clothdata[id].p_id && cartData[i].byed == 0)
                {                                 
                    console.log("Comparison success qty = ",cartData[i].qty)      
                    cqty = 1
                    ix = i
                    cartid = cartData[i].id                                                          
                }                
            }
            if(cqty == 1)   
            {
                console.log("Present")
                let data = {}
                data.uname = user
                data.p_id = clothdata[id].p_id        
                data.qty = parseInt(cartData[ix].qty) + 1
                data.byed = 0
                $.ajax({            
                    url : url+"/cart/"+cartid,
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
            else    
            {
                console.log("Absent")
                let data = {}
                data.qty = 1
                data.p_id = clothdata[id].p_id  
                data.uname = user    
                data.byed = 0                    
                $.ajax({
                    url : url+"/cart",
                    type : "POST",
                    data : data,
                    success : (posRes) =>{
                        console.log(posRes)
                    },
                    error : (errRes) =>{
                        console.log(errRes)
                    }
                })
            }
        },
        error: (errRes) => {
            console.log(errRes)
        }
    })        
}
                                
dashboard()
shirt()














// $.ajax({
//     url : "http://localhost:3000/shoe",
//     type : "GET",
//     success : (posRes) =>{
//         gdata = posRes
//         for(let i = 0; i<gdata.length;i++)
//         {
//         <div class="collapse" id="collapseExample">

//         <div class="card card-body">
//            `${gdata[c].description}`
//       </div>
//       </div>
//         }
//     }})


// $.ajax({
//     url : "http://localhost:3000/shoe",
//     type : "GET",
//     success : (posRes) =>{
//         gdata = posRes
//         let x = ``
//         x=x+`
//         <div class="row" >
//         `
//         for(let i = 0; i<gdata.length;i++)
//         {
//                 x = x + `
//             <div class="col-sm-3" >
//             <div class="card" style="margin-top: 30px;" >
//             <img class="card-img-top zoom" src="${gdata[i].imgsrc}"  alt="Card image cap">
//             <div class="card-body">
//             <h5 class="card-title text-dark">${gdata[i].name}</h5>
//                         <p class="card-text text-muted">${gdata[i].type}</p>
//                         <div>
//                         <p  class="card-text text-danger" style="float:left">${gdata[i].price}</p>
//                         <p class="card-text text-dark" style="float:right ; padding-right:100px"><s>${gdata[i].discountedprice}</s></p>
//                       </div>
//             </div>
// <div>
//             <button   class="btn btn-outline-primary btn-sm float-left" onclick="addtocart('${i}')" style="border-radius: 6px;width :125px;margin-left:15px;"  >Add To Cart &nbsp; <i class="fa-solid fa-heart"></i> </button>                    
//             <button   class="btn btn-outline-danger btn-sm float-right" onclick="buynow('${i}')" style="border-radius: 6px;width :100px; margin-right:15px;" >Buy Now &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button> 
//             <button   class="btn btn-outline-secondary btn-sm " data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false"  aria-controls="collapseExample" style="margin-top:10px;margin-bottom:10px;border-radius: 6px;width :230px; margin-left:15px; " >Learn More &nbsp;<i class="fa-solid fa-bag-shopping"></i>  </button>                          

//             <div class="collapse" id="collapseExample${i}">
//             <div class="card card-body">
//               ${gdata[i].description}
//             </div>
//             </div>

// </div>
//             </div>
//             </div>
//             `
//             }
            
//         x = x + `
//         </div>
//         `
//         document.getElementById('shoe').innerHTML = x
//     },
//     error : (errRes) =>{
//         console.log("Error is:- ",errRes.status)
//     }

// })
