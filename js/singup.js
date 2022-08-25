signurl ="http://localhost:3000/user"
$(document).ready(()=>{

$("#create1").click(()=>{
    let email1 = document.getElementById("email").value
    $.ajax({
        url : signurl,
        type : "GET",
        success : (posRes) =>{
            for(let i =0 ; i<posRes.length; i++){
                if(posRes[i].email==email1){
                    alert ("User already exist! please use another Email")
                }
                else{
                    let pdata = {
                        name : document.getElementById("name").value,
                        email : document.getElementById("email").value,
                        password : document.getElementById("password").value
                    }
                    $.ajax({            
                        url : signurl,
                        type : "Post",
                        data : pdata,
                        success : (posRes) =>{
                            console.log(posRes)
                            alert("Your Account has been created! Please Login!")
                        },
                        error : (errRes) =>{
                            console.log(errRes)
                        }
                    })
                }
}}
            })

    })
})




