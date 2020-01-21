
$(document).ready(function(){
    $("#carouselId").hide();
   $(".hoverElectronics").hover(function(){
      $(".showElectronics").toggle();
   });
   $(".hoverBooks").hover(function(){
      $(".showBooks").toggle();
   });

   $("#projects").tabs();

     $("ul#main").sortable({
       axis: "x",
       containment: "#projects"
     });

   $.ajax({
    url: "flipkart.json",
    dataType: "json",
    type: "get",
    cache: false,
    success: function(data){
      $(data).each(function(index, value){
        var display = "<ul id='"+value.type+"'></ul>";
        var homeDisplay = "<ul id='home'></ul>";
        $(".displayData").append(display);
        $(".displayData").append(homeDisplay);

        if(value.type == 'electronics'){
          $("#electronics").append("<li class='displayImages'>"
             +"<figure class='figure'>"
               +"<img class='img-thumbnail' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<figcaption class='figure-cap'>"
                 +value.name+"<br> Price: "+value.price
               +"</figcaption>"
             +"</figure>"
          +"</li>");
        }
        else if(value.type == 'books'){
          $("#books").append("<li class='displayImages'>"
             +"<figure class='figure'>"
               +"<img class='img-thumbnail' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<figcaption class='figure-cap'>"
                 +value.name+"<br> Price: "+value.price
               +"</figcaption>"
             +"</figure>"
          +"</li>");
        }
        if(value.rating >= 4){
          $("#home").append("<li class='displayImages'>"
             +"<figure class='figure'>"
               +"<img class='img-thumbnail' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<figcaption class='figure-cap'>"
                 +value.name+"<br> Price: "+value.price
               +"</figcaption>"
             +"</figure>"
          +"</li>");
        }
      });
    }
   });
});
