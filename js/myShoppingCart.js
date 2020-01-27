
$(document).ready(function(){
   /*$(".hoverElectronics").hover(function(){
      $(".showElectronics").toggle();
   });
   $(".hoverBooks").hover(function(){
      $(".showBooks").toggle();
   });*/

   $("#displayImageDetails").hide();
   $("#displayImageComments").hide();

   $('#electronicDropdown').mouseenter(function () {
       $('.showElectronics').toggle('medium');
       $('.showBooks').hide();
   });
   $('#bookDropdown').mouseenter(function () {
      $('.showBooks').toggle('medium');
      $('.showElectronics').hide();
   });

   /*
   $(".booksLink").click(function(){
      alert("Books clicked");
      $(".displayData").empty();
      var books = $("#books");
      $(".displayData").append(books);
      //$("#books").show();
   });
  */

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
   //$("div.displayData ul#home").show();

   $("#homeTab").click(function(){
      /*alert("homeTab");
      $("#home").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
      $("#displayImageComments").hide();
   });

   $("#elecotronicsTab").click(function(){
      /*alert("elecotronicsTab");
      $("#electronics").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
      $("#displayImageComments").hide();
   });

   $("#booksTab").click(function(){
      /*alert("booksTab");
      $("#books").show();*/
      $(".displayData").show();
      $("#displayImageDetails").hide();
      $("#displayImageComments").hide();
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

        if(value.type == 'electronics'){
          $("#electronics").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
                +"<img class='imageDetails img-thumbnail img-responsive img-fluid' id='dynamicID"+index+"' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p value='"+value.name+"'>"+value.name+"</p>"
                +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i> "+value.price+"</p>"
                +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
        else if(value.type == 'books'){
          $("#books").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
                +"<img class='imageDetails img-thumbnail img-responsive img-fluid' id='dynamicID"+index+"' title='"+value.description+"' src='"+value.imgPath+"'>"
                +"<p value='"+value.name+"'>"+value.name+"</p>"
                +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i> "+value.price+"</p>"
                +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }

        if(value.rating >= 4){
          $("#home").append("<li class='displayImages'>"
             +"<div class='paddingImage'>"
               +"<img class='imageDetails img-thumbnail img-responsive img-fluid' title='"+value.description+"' src='"+value.imgPath+"'>"
               +"<p value='"+value.name+"'>"+value.name+"</p>"
               +"<p class='price' value='"+value.price+"'><i class='fa fa-rupee'></i> "+value.price+"</p>"
               +"<button class='btn btn-success text-white rating' value='"+value.rating+"'>"+value.rating+"<i class='fa fa-star' aria-hidden='true'></i></button>"
             +"</div>"
          +"</li>");
        }
      });

      $(".imageDetails").click(function(event){
        //alert("image");
        $("#displayImageDetails").empty();
        $("#displayImageDetails").show();
        $("#displayImageComments").empty();
        $("#displayImageComments").show();
        $(".displayData").hide();
       /// $("#commentsDiv").hide();
        //console.log(value.name);
        var result = '';
        var imagePath = $(this).attr("src");
        var imgId = imagePath.split("/");
       /* console.log(imgId);
        console.log(imgId[1]);*/
        var str = imgId[1].slice(0, -5);
        // console.log(str);
        $(data).each(function(i, v){
          if(v.id == str){
              // alert(v.id+" "+str);
              $("#displayImageComments").empty();
              $("#displayImageComments").show();
              var tableForComment = "<div class='text-primary'><b>Reviews</b></div>"
                tableForComment += "<table class='commentsTable'>";
                // tableForComment + "<tr>Reviews</tr>"
                tableForComment += "<tr>";
                //tableForComment += "<td class='text-success'><b>Reviews</b></td>";
                tableForComment += "<td id='tableCommentsData'></td>";
                tableForComment += "</tr>";
                tableForComment += "</table>";

               $("#displayImageComments").append(tableForComment);
              for(var x=0; x<v.comments.length; x++){
                console.log(v.comments[x].text);
                $("#tableCommentsData").append("<ul>"
                  +"<li>"+v.comments[x].text+"</li>"
                  +"<li class='bg-success text-white commentRating'><b>"+v.comments[x].rating+"</b><i class='fa fa-star' aria-hidden='true'></i></li>"
                  +"<li class='text-muted'>user - "+v.comments[x].username+"</li>"
                  +"<li class='text-muted'>commented on - "+v.comments[x].commentedOn+"</li>"
                +"------------------------------</ul>");
              }
            if(v.type == 'electronics'){
              if(v.offers[0].amount == undefined){
                $("#displayImageDetails").append("<div class='container'>"
                  +"<table>"
                    +"<tr>"
                      +"<td class='imageD'>"
                        +"<img class='img-thumbnail img-responsive img-fluid' src='"+v.imgPath+"' style='height: 300px;width: 200px'>"
                        +"<button class='btn btn-warning text-white'><i class='fa fa-shopping-cart'><b></i>Add TO CART</b></button>"
                      +"</td>"
                      +"<td class='imageDescription'>"
                        +"<ul>"
                          +"<li class='text-dark'><b>"+v.name+" ( "+v.color+", "+v.RAM+" )</b></li>"
                          +"<li><button class='btn btn-success text-white rating'>"+v.rating+"<i class='fa fa-star' aria-hidden='true'></i></button></li>"
                          +"<li><i class='fa fa-rupee'> <b>"+v.price+"</b></i></li>"
                          +"<li>Model Name - "+v.modelName+"</li>"
                          +"<li class='text-info'><b><i class='fa fa-bolt'><b> Battery</b></i>"+v.battery+"</b></li>"
                          +"<li>Brand - "+v.brand+"</li>"
                          +"<li class='floatClass'><i class='fa fa-camera'></i> Camera Front - "+v.camera.front+"</li>"
                          +"<li>, Rear - "+v.camera.rear+"</li>"
                          +"<li class='text-success'><i class='fa fa-tag'></i><b> Offer - "+v.offers[0].type+" "+v.offers[0].percentage+"</b></li>"
                          +"<li><b>Description - </b>"+v.description+"</li>"
                          +"<li class='clickComments'><a href='#commentsDiv' class='text-primary'>view "+v.comments.length+" comments</a></li>"
                        +"</ul>"
                      +"</td>"
                    +"</tr>"
                  +"</table>"
                +"</div>");
              }
              else{
                $("#displayImageDetails").append("<div class='container'>"
                  +"<table>"
                    +"<tr>"
                      +"<td class='imageD'>"
                        +"<img class='img-thumbnail img-responsive img-fluid' src='"+v.imgPath+"' style='height: 300px;width: 200px'>"
                        +"<button class='btn btn-warning text-white'><i class='fa fa-shopping-cart'><b></i>Add TO CART</b></button>"
                      +"</td>"
                      +"<td class='imageDescription'>"
                        +"<ul>"
                          +"<li class='text-dark'><b>"+v.name+" ( "+v.color+", "+v.RAM+" )</b></li>"
                          +"<li><button class='btn btn-success text-white rating'>"+v.rating+"<i class='fa fa-star' aria-hidden='true'></i></button></li>"
                          +"<li><i class='fa fa-rupee'> <b>"+v.price+"</b></i></li>"
                          +"<li>Model Name - "+v.modelName+"</li>"
                          +"<li class='text-info'><b><i class='fa fa-bolt'><b> Battery<b></i>"+v.battery+"</b></li>"
                          +"<li>Brand - "+v.brand+"</li>"
                          +"<li class='floatClass'><i class='fa fa-camera'></i> Camera Front - "+v.camera.front+"</li>"
                          +"<li>, Rear - "+v.camera.rear+"</li>"
                          +"<li class='text-success'><i class='fa fa-tag'></i><b> Offer - <i class='fa fa-rupee'><b>"+v.offers[0].amount+"</b></i> "+v.offers[0].type+"</b></li>"
                          +"<li><b>Description - </b>"+v.description+"</li>"
                          +"<li class='clickComments'><a href='#commentsDiv' class='text-primary'>view "+v.comments.length+" comments</a></li>"
                        +"</ul>"
                      +"</td>"
                    +"</tr>"
                  +"</table>"
                +"</div>");
              }
            }
            else if(v.type == 'books'){
              $("#displayImageDetails").append("<div class='container'>"
                  +"<table><tr>"
                    +"<td class='imageD row row-lg-12'>"
                      +"<img class='img-thumbnail img-responsive img-fluid' src='"+v.imgPath+"' style='height: 300px;width: 200px'>"
                      +"<button class='col col-lg-12 btn btn-warning text-white'><i class='fa fa-shopping-cart'><b></i>Add TO CART</b></button>"
                     // +"<button class='col col-lg-6 btn btn-success'><i class='fa fa-bolt'><b></i> BUY NOW<b></button>"
                    +"</td>"
                    +"<td class='imageDescription'>"
                      +"<ul>"
                        +"<li class='text-dark'><b>"+v.name +"</b></li>"
                        +"<li><button class='btn btn-success text-white rating'>"+v.rating+"<i class='fa fa-star' aria-hidden='true'></i></button></li>"
                        +"<li><i class='fa fa-rupee'> <b>"+v.price+"</b></i></li>"
                        +"<li>Author - "+v.by+"</li>"
                        +"<li class='text-success'><i class='fa fa-tag'></i><b> Offer </b><i class='fa fa-rupee'><b>"+v.offers[0].amount+"</b></i> <button class='btn btn-primary text-white'>"+v.offers[0].type+"</button></li>"
                        +"<li><b>Description - </b>"+v.description+"</li>"
                        +"<li><a href='#' class='text-primary'>view "+v.comments.length+" comments</a></li>"
                      +"</ul>"
                    +"</td>"
                  +"</tr></table>"
              +"</div>");
            }
          }//if
        });//each
      });//image click event
    }//success
  });//ajax function
});//document ready function
      /*
        var srcAttr = $(this).attr("src");
        var idAttr = $(this).attr("id");
        var titleAttr = $(this).attr("title");
        //  console.log(titleAttr);
        //  console.log($(this));
        //  console.log(srcAttr);
        //  console.log(idAttr);

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
    */


