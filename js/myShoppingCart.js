
$(document).ready(function(){
   /*$(".hoverElectronics").hover(function(){
      $(".showElectronics").toggle();
   });
   $(".hoverBooks").hover(function(){
      $(".showBooks").toggle();
   });*/
   $("#displayImageDetails").hide();

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
    /*
   $(".customTabs").click(function(){
      $("#displayImageDetails").hide();
      $(".displayData").show();
   });
   */
   $("#homeTab").click(function(){
      /*alert("homeTab");
      $("#home").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
   });
   $("#elecotronicsTab").click(function(){
      /*alert("elecotronicsTab");
      $("#electronics").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
   });
   $("#booksTab").click(function(){
      /*alert("booksTab");
      $("#books").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
   });


   $.ajax({
    url: "flipkart.json",
    dataType: "json",
    type: "get",
    cache: false,
    success: function(data){
      /*alert(data);*/

      $(data).each(function(index, value){
        var display = "<ul id='"+value.type+"'></ul>";
        var homeDisplay = "<ul id='home'></ul>";
        $(".displayData").append(display);
        $(".displayData").append(homeDisplay);
        // console.log(index);
        /*$("#home, #electronics, #books").click(function(){
          $("#projects").show();
          $(".displayData").hide();
        });*/

        /*
          var imagePath = value.imgPath;
          var imgId = imagePath.split("/");
          console.log(imgId);
          console.log(imgId[1]);
          var str = imgId[1].slice(0, -5);
          console.log(str);
          console.log(value.id);
        */

        if(value.type == 'electronics'){
          $("#electronics").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
                +"<img class='imageDetails img-thumbnail img-responsive img-fluid' id='dynamicID"+index+"' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p value='"+value.name+"'>"+value.name+"</p>"
                +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i>"+value.price+"</p>"
                +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
        else if(value.type == 'books'){
          $("#books").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
                +"<img class='imageDetails img-thumbnail img-responsive img-fluid' id='dynamicID"+index+"' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p value='"+value.name+"'>"+value.name+"</p>"
                +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i>"+value.price+"</p>"
                +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }

        if(value.rating >= 4){
          $("#home").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
               +"<img class='imageDetails img-thumbnail img-responsive img-fluid' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<p value='"+value.name+"'>"+value.name+"</p>"
               +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i>"+value.price+"</p>"
               +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
      });
      $(".imageDetails").click(function(event){
        //alert("image");
        $("#displayImageDetails").empty();
        $("#displayImageDetails").show();
        $(".displayData").hide();
        //console.log(value.name);
        var result = '';
        var imagePath = $(this).attr("src");
        var imgId = imagePath.split("/");
       /* console.log(imgId);
        console.log(imgId[1]);*/
        var str = imgId[1].slice(0, -5);
        // console.log(str);
        // ============================================
        /*$(data).each(function(i, v){
          if(v.id == str){
            // alert(v.id+" "+str);
            $("#displayImageDetails").append("<div class='container'>"
              +"<table><tr>"
                +"<td class='imageD'>"
                  +"<img class='img-thumbnail img-responsive img-fluid' src='"+v.imgPath+"' style='height: 300px;width: 200px'>"
                +"</td>"
                +"<td class='imageDescription'>"
                  +"<ul>"
                    +"<li class='text-dark'>"+v.name +"</li>"
                    +"<li><button class='btn btn-success text-white rating'>"+v.rating+"<i class='fa fa-star' aria-hidden='true'></i></button></li>"
                    +"<li><i class='fa fa-rupee'>"+v.price+"</i></li>"
                    +"<li>"+v.RAM+"</li>"
                    +"<li>"+v.modelName+"</li>"
                    +"<li>"+v.color+"</li>"
                    +"<li>"+v.battery+"</li>"
                    +"<li>Description : "+v.description+"</li>"
                  +"</ul>"
                +"</td>"
              +"</table></tr>"
            +"</div>");
          }
        });*/ // =======================================================

        var srcAttr = $(this).attr("src");
        var idAttr = $(this).attr("id");
        var titleAttr = $(this).attr("title");
        //console.log(titleAttr);
        /*console.log($(this));
          console.log(srcAttr);
          console.log(idAttr);
        */
        var nameAttr = $(this).siblings().attr("value");
        //console.log(nameAttr);
        var ratingAttr = $(this).siblings(".btn").attr("value");
        //console.log(ratingAttr);
        var priceAttr = $(this).siblings(".price").attr("value");
        //console.log(priceAttr);

        $("#displayImageDetails").append("<div class='container'>"
          +"<table><tr>"
            +"<td class='imageD'>"
              +"<img class='img-thumbnail img-responsive img-fluid' src='"+srcAttr+"' style='height: 300px;width: 200px'>"
            +"</td>"
            +"<td class='imageDescription'>"
              +"<p class='text-dark'>"+nameAttr+"</p>"
              +"<button class='btn btn-success text-white rating'>"+ratingAttr+"<i class='fa fa-star' aria-hidden='true'></i></button>"
              +"<p><i class='fa fa-rupee'>"+priceAttr+"</i></p>"
              +"<p>Description : "+titleAttr+"</p>"
            +"</td>"
          +"</table></tr>"
        +"</div>");
      });
    }
   });
});
