var baseUrl = "https://api.nasa.gov/planetary/apod?api_key=Ycpkv3EwBWsNH4XlLt2txwpKSDkUhwyuvulAdZWt";

// Get today's media
getPicture(baseUrl);





/***** FUNCTIONS DECLARATIONS *****/
function loadMediaOfDate() {
  var patt = new RegExp("^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$");
  var chosenDate = jQuery("#datepicker").val();

  if(patt.test(chosenDate) === true) {
    getPicture(baseUrl + "&date=" + chosenDate);
  }
}


function getPicture(url) {
  jQuery("#mymodal-loading").removeClass("mymodal-hide");
  jQuery.ajax({
  		type : "GET",
  		url : url,
  		contentType : "application/json; charset=utf-8",
  		dataType : "json",
  		success : function(result) {
        jQuery("#date").text(result.date);
        jQuery("#title").text(result.title);
        jQuery("#description").text(result.explanation);
        if(result.copyright != undefined) {
          jQuery("#copyright").text("Copyright: " + result.copyright);
        }
        if(result.media_type == "image") {
          jQuery("#media-container").html('<a href="' + result.hdurl + '" target="_blank">' + '<img class="thumbnail" src="' + result.url + '">' + '</a>');
        }
        else if(result.media_type == "video") {
          jQuery("#media-container").html('<iframe class="thumbnail" width="560" height="315" src="' + result.url +'" frameborder="0" allowfullscreen></iframe>');
        }
        jQuery("#mymodal-loading").addClass("mymodal-hide");
  		},
  		failure : function(error) {
        console.log("ERROR: " + error);
  		}
  	});
}
