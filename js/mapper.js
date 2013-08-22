var Mapper = (function ($) {
  "use strict";

  var defaultOptions = {
    width     : 500,
    height    : 500,
    center    : { x : 0, y : 45 },
    scale     : 307,
    rotate    : { x : 35, y : 0 },
    worldJson : "support/world-110m2.json",
    cities    : "support/cities.csv"
  };

  function Mapper(options) {
    this.options = $.extend({}, defaultOptions, options);
    this.global = buildVector(this).append("g");

    configuration(this);

    buildVector(this);
  }

  function configuration(_self) {
    mapVectors(_self);
  }

  function projection(_self) {
    return d3.geo.mercator()
      .center([ _self.options.center.x, _self.options.center.y ])
      .rotate([ _self.options.rotate.x, _self.options.rotate.y ])
      .scale(_self.options.scale);
  }

  function buildVector(_self) {
    return d3.select("body").append("svg")
      .attr("width", _self.options.width)
      .attr("height", _self.options.height);
  }

  function path(_self) {
    return d3.geo.path().projection(projection(_self));
  }

  function selectAllPath(_self, global, topology) {
    global.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries).geometries)
      .enter()
      .append("path")
      .attr("d", path(_self));
  }

  // Load and display the cities
  function csv(_self, global) {
    d3.csv("support/cities.csv", function(error, data) {
      global.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return projection(_self)([d.lon, d.lat])[0]; })
      .attr("cy", function(d) { return projection(_self)([d.lon, d.lat])[1]; })
      .attr("r", 5)
      .style("fill", "red");
    });
  }

  // Load and display the World
  function mapVectors(_self) {
    d3.json("support/world-110m2.json", function(error, topology) {
      csv(_self, _self.global);
      selectAllPath(_self, _self.global, topology);
    });
  }

  // Zoom and pan
  function zoom(_self, global) {
    return d3.behavior.zoom()
      .on("zoom",function() {
        global.attr("transform","translate("+ 
          d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        global.selectAll("circle")
        .attr("d", path(_self).projection(projection(_self)));
      global.selectAll("path")  
        .attr("d", path(_self).projection(projection(_self))); 

      });
  }

  return Mapper;
}(jQuery));

$(document).ready(function () {
  new Mapper({
    width  : document.width,
    height : document.height
  });
});
