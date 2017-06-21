angular.module("astrohub.services", [])

.service("Apod", function($http) {
  this.getPicture = function(url) {
    return $http.get(url).then(function(response) {
      return response.data;
    },
    function(error) {
      return error;
    });
  }

  this.fillHtml = function(apod) {
    jQuery("#date").text(moment(apod.date).format("MMMM DD, YYYY"));
    jQuery("#title").text(apod.title);
    jQuery("#description").text(apod.explanation);
    if(apod.copyright != undefined) {
      jQuery("#copyright").text("Copyright: " + apod.copyright);
    }
    if(apod.media_type == "image") {
      jQuery("#media-container").html('<a href="' + apod.hdurl + '" target="_blank">' + '<img class="thumbnail" src="' + apod.url + '">' + '</a>');
    }
    else if(apod.media_type == "video") {
      jQuery("#media-container").html('<iframe class="thumbnail" width="560" height="315" src="' + apod.url +'" frameborder="0" allowfullscreen></iframe>');
    }
  }
})

.service("Cate", function($http) {
  this.getNeos = function(filter) {
    return $http.get("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + filter.startDate + "&end_date=" + filter.endDate +"&api_key=DEMO_KEY").then(function(response) {
      var neos = [];
      var data = response.data;
      for(var d = filter.startDate; d <= filter.endDate; d = moment(d).add(1, 'd').format("YYYY-MM-DD")) {
        if(data.near_earth_objects[d]) {
          data.near_earth_objects[d].forEach(function(neo) {
            var miss_dist = Number(neo.close_approach_data[0].miss_distance.astronomical).toFixed(5);
            if(miss_dist > filter.missDistance) {
              return;
            }
            var link = neo.nasa_jpl_url;
            var name = neo.name;
            var ca_date = neo.close_approach_data[0].close_approach_date;
            var v_rel = Number(neo.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2);
            var h = Number(neo.absolute_magnitude_h).toFixed(1);
            var diameter = Number(neo.estimated_diameter.meters.estimated_diameter_min).toFixed(0) + " - " + Number(neo.estimated_diameter.meters.estimated_diameter_max).toFixed(0);
            var isHazardous = neo.is_potentially_hazardous_asteroid;

            neos.push({
              link: link,
              name: name,
              ca_date: ca_date,
              miss_dist: miss_dist,
              v_rel: v_rel,
              h: h,
              diameter: diameter,
              isHazardous: isHazardous,
              nameHTML: '<a href="' + link + '" target="_blank">' + name + '</a>',
              isHazardousHTML: isHazardous ? '<span class="danger-text">' + 'Yes' + '</span>' : '<span class="success-text">' + 'No' + '</span>'
            });
          });
        }
      }
      return neos;
    },
    function(error) {
      return error;
    });
  }
});
