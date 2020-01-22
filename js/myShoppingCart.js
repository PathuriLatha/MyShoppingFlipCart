
$(document).ready(function(){
   /*$(".hoverElectronics").hover(function(){
      $(".showElectronics").toggle();
   });
   $(".hoverBooks").hover(function(){
      $(".showBooks").toggle();
   });*/
   $('#electronicDropdown').mouseenter(function () {
       $('.showElectronics').toggle('medium');
       $('.showBooks').hide();
   });
   $('#bookDropdown').mouseenter(function () {
      $('.showBooks').toggle('medium');
      $('.showElectronics').hide();
   });

   /*$("#electronicDropdown, #bookDropdown").mouseout(function(){
      $('.showElectronics').hide();
      $('.showBooks').hide();
   });*/
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
             +"<div class='paddingImage'>"
                +"<img class='img-thumbnail img-responsive img-fluid' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p>"+value.name+"<br> <i class='fa fa-rupee'></i>"+value.price+"</p>"
                +"<button class='btn btn-success text-white rating'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
        else if(value.type == 'books'){
          $("#books").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
                +"<img class='img-thumbnail img-responsive img-fluid' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p>"+value.name+"<br> <i class='fa fa-rupee'></i>"+value.price+"</p>"
                +"<button class='btn btn-success text-white rating'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
        if(value.rating >= 4){
          $("#home").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
               +"<img class='img-thumbnail img-responsive img-fluid' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<p>"+value.name+"<br> <i class='fa fa-rupee'></i>"+value.price+"</p>"
               +"<button class='btn btn-success text-white rating'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
      });
    }
   });
});
