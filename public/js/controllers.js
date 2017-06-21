angular.module("astrohub.controllers", [])
.controller("HomeController", function($scope) {
})

.controller("ApodController", function($scope, Apod) {
  var baseUrl = "https://api.nasa.gov/planetary/apod?api_key=Ycpkv3EwBWsNH4XlLt2txwpKSDkUhwyuvulAdZWt";
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
  $scope.dateRange = "2";
  $scope.missDistance = "0.5";
  /** GET NEOs FOR DEFAULT FILTERS (WITHIN 2 DAYS, MISS DIST. <= 0.5 AU) **/
  var filter = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, 'd').format("YYYY-MM-DD"),
    missDistance: 0.5
  };
  jQuery("#mymodal-loading").removeClass("mymodal-hide");
  Cate.getNeos(filter).then(function(res) {
    $('#cate-table').DataTable({
      data: res,
      columns: [
        {data: "nameHTML"},
        {data: "ca_date"},
        {data: "miss_dist"},
        {data: "v_rel"},
        {data: "h"},
        {data: "diameter"},
        {data: "isHazardousHTML"},
      ]
    });
    jQuery("#mymodal-loading").addClass("mymodal-hide");
  },
  function(error) {
    jQuery("#mymodal-loading").addClass("mymodal-hide");
  });

  $scope.filter = function(dateRange, missDistance) {
    var filter = {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().add(Number(dateRange) - 1, 'd').format("YYYY-MM-DD"),
      missDistance: Number(missDistance)
    };

    jQuery("#mymodal-loading").removeClass("mymodal-hide");
    Cate.getNeos(filter).then(function(res) {
      $("#cate-table").DataTable().destroy();
      $('#cate-table').DataTable({
        data: res,
        columns: [
          {data: "nameHTML"},
          {data: "ca_date"},
          {data: "miss_dist"},
          {data: "v_rel"},
          {data: "h"},
          {data: "diameter"},
          {data: "isHazardousHTML"},
        ]
      });
      jQuery("#mymodal-loading").addClass("mymodal-hide");
    },
    function(error) {
      jQuery("#mymodal-loading").addClass("mymodal-hide");
    });
  }

});
