let url = "http://localhost:3000"
window.localStorage.setItem("url",url )
function login(){
    let password = document.getElementById("password").value
    let name =document.getElementById("name").value
    $.ajax({
        url : url +"/user?q=" + name,
        type : "GET",
        success : (posRes) =>{
            console.log(posRes) 
            for(let u =0 ; u<posRes.length; u++){
                if(posRes[u].name==name && posRes[u].password==password){
                    alert("Login Success!")
                    window.localStorage.setItem('user',name)
                    window.open("/Users/apple/Desktop/ecommerce/html/dashboard.html")
                }
                else {
                    ++u
                    alert("Login Failed!")
                }
             }}
        })
    }


