// D3.js Library         - https://github.com/mbostock/d3
// World Map Projections - https://github.com/d3/d3-geo-projection/
// TopoJSON Library      - https://github.com/mbostock/topojson

var Mapper = (function ($) {
  "use strict";

  var defaultOptions = {
    width  : 500,
    height : 500,
    scale  : 307,
    center : { x : 0, y : 45 },
    rotate : { x : 35, y : 0 }
  };

  function Mapper(options) {
    this.options = $.extend({}, defaultOptions, options);
    this.svg = svg(this);
    this.projection = projection(this);
    this.path = path(this);

    builder(this);
  }

  function builder(_self) {
    new Mapper.World(_self, {}).load();
    new Mapper.StaticLocations(_self, {}).load();
    new Mapper.PointFinder(_self).report();
  }

  function projection(_self) {
    return d3.geo.miller()
      .precision(0.1)
      .center([ _self.options.center.x, _self.options.center.y ])
      .rotate([ _self.options.rotate.x, _self.options.rotate.y ])
      .scale(_self.options.scale);
  }

  function svg(_self) {
    return d3.select("body").append("svg")
      .attr("width", _self.options.width)
      .attr("height", _self.options.height);
  }

  function path(_self) {
    return d3.geo.path().projection(_self.projection);
  }

  return Mapper;
}(jQuery));

$(document).ready(function () {
  new Mapper({
    width  : $(document).width(),
    height : $(document).height()
  });
});
