var Mapper = (function ($) {
  "use strict";

  var defaultOptions = {
    width  : 500,
    height : 500
  };

  function Mapper(options) {
    this.options = $.extend({}, defaultOptions, options);
    this.global = buildVector(this).append("g");

    configuration(this);
  }

  function configuration(_self) {
    new Mapper.JSON(_self, {}).load();
  }

  function buildVector(_self) {
    return d3.select("body").append("svg")
      .attr("width", _self.options.width)
      .attr("height", _self.options.height);
  }

  return Mapper;
}(jQuery));

$(document).ready(function () {
  new Mapper({
    width  : $(document).width(),
    height : $(document).height()
  });
});
