class MyHeader extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML =`
        <div class="navbar navbar-light backgrounddiv text-dark navbar-expand-lg " style="padding-left:2px;padding-top: 20px;">
          <button class="navbar-toggler" data-toggle="collapse" data-target="myoption">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="myoptions">
            <ul class="navbar-nav">
                <li ><a href="./shirt.html"   style="color:#64469c; margin-left: 20px;" >Clothing</a></li>
                <li style="margin-left:20px"><a href="./shoe.html"  style="color:#64469c; margin-left: 10px;" >Shoe</a></li>
    
    
    <form class="form-inline search ">

        <input type="text" class="form-control " style=" color : #64469c ; width: 165px; height: 35px; border-radius: 10px; font-family: Arial,FontAwesome; padding-top: 10px;padding-left: 15px; border-color: #e0d5f5;margin-left: 60px; "  placeholder= "&#xf002; &nbsp; Search" >
        
        
        </form> 
                      
</ul>

            <a href="./dashboard.html" class="navbar-brand h1 mb-0 animate__animated animate__flash" style="font-family:'Dancing Script', cursive; font-weight: 700; padding-left:80px; ">
              <img src="../images/newlogo (1).png" style="width:200px ; "></a>

            <a href="./cart.html"  class="btn btn-light" style="margin-left: 100px; color :#402972;"> Cart &nbsp; <i class="fa-solid fa-heart" style="color : #64469c ;"></i></a> 
            <a href="./cartdisplay.html"  class="btn btn-light" style="margin-left: 20px; color : #402972;"> Buy &nbsp;<i class="fa-solid fa-cart-arrow-down"style="color : #64469c ;"></i></a> 
            <button href="#" onclick="logout()" class="btn btn-light" style="margin-left: 20px; color : #402972;"> Logout  &nbsp;<i class="fa-solid fa-user" style="color : #64469c ;"></i></button> 
      
                     
                </div>
        `
    }}customElements.define("my-header", MyHeader);


    