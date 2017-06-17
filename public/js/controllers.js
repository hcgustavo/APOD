angular.module("astrohub.controllers", [])
.controller("HomeController", function($scope) {
})

.controller("ApodController", function($scope, Apod) {
  var baseUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
  jQuery( "#datepicker" ).datepicker({dateFormat: "yy-mm-dd", showButtonPanel: true});

  /****************** GET PICTURE OF THE DAY ********************/
  jQuery("#mymodal-loading").removeClass("mymodal-hide");
  Apod.getPicture(baseUrl).then(function(res) {
    Apod.fillHtml(res);
    jQuery("#mymodal-loading").addClass("mymodal-hide");
  }, function(error) {
    jQuery("#mymodal-loading").addClass("mymodal-hide");
    alert("Could not load image data.");
  });


  /******************* GET PICTURE BY DATE ********************/
  $scope.getPicByDate = function(date) {
    jQuery("#mymodal-loading").removeClass("mymodal-hide");
    Apod.getPicture(baseUrl + "&date=" + date).then(function(res) {
      Apod.fillHtml(res);
      jQuery("#mymodal-loading").addClass("mymodal-hide");
    }, function(error) {
      jQuery("#mymodal-loading").addClass("mymodal-hide");
      alert("Could not load image data.");
    });
  }

})

.controller("CateController", function($scope, Cate) {

  /** GET NEOs FOR DEFAULT FILTERS (WITHIN 2 DAYS, MISS DIST. <= 0.5 AU) **/
  var filter = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, 'd').format("YYYY-MM-DD"),
    missDistance: 0.5
  };
  jQuery("#mymodal-loading").removeClass("mymodal-hide");
  Cate.getNeos(filter).then(function(res) {
    $scope.neos = res;
    jQuery("#mymodal-loading").addClass("mymodal-hide");
  },
  function(error) {
    jQuery("#mymodal-loading").addClass("mymodal-hide");
  });

});
