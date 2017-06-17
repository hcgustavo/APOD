angular.module("astrohub", ['ngRoute', 'astrohub.controllers', 'astrohub.services'])
.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "templates/home.html"
  })
  .when("/apod", {
    templateUrl: "templates/apod.html",
    controller: "ApodController"
  })
  .when("/cate", {
    templateUrl: "templates/cate.html",
    controller: "CateController"
  })
  .when("/about", {
    templateUrl: "templates/about.html"
  })
  .otherwise({
    redirectTo: "/"
  })
});
