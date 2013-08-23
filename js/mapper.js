var Mapper = (function ($) {
  "use strict";

  var defaultOptions = {
    width     : 500,
    height    : 500,
    center    : { x : 0, y : 45 },
    scale     : 307,
    rotate    : { x : 35, y : 0 },
    worldJson : "support/world-110m2.json"
  };

  function Mapper(options) {
    this.options = $.extend({}, defaultOptions, options);
    this.global = buildVector(this).append("g");

    configuration(this);
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

  function selectAllPath(_self, topology) {
    _self.global.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries).geometries)
      .enter()
      .append("path")
      .attr("d", path(_self));
  }

  // Load and display the World
  function mapVectors(_self) {
    d3.json(_self.options.worldJson, function(error, topology) {
      new Mapper.CSV(_self, projection(_self), {}).load();
      selectAllPath(_self, topology);
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
