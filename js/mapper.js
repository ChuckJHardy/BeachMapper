var Mapper = (function ($) {
  "use strict";

  var defaultOptions = {
    width  : 500,
    height : 500
  };

  function Mapper(options) {
    this.options = $.extend({}, defaultOptions, options);
    this.svg = svg(this);
    this.projection = projection(this);
    this.graticule = graticule(this);
    this.path = path(this);

    configuration(this);
  }

  function configuration(_self) {
    buildWorld(_self);
  }

  function buildWorld(_self) {
    new Mapper.World(_self, {}).load();
  }

  function projection(_self) {
    return d3.geo.kavrayskiy7();
  }

  function graticule(_self) {
    return d3.geo.graticule();
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
