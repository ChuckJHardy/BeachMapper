Mapper.CSV = (function ($) {
  "use strict";

  var defaultOptions = {
    cities : "support/cities.csv"
  };

  function CSV(_loader, projection, options) {
    this.options = $.extend({}, defaultOptions, options);

    this._loader = _loader;
    this.projection = projection;
  }

  CSV.prototype = {
    load: function () {
      var _self = this;

      d3.csv(_self.options.cities, function(error, data) {
        _self._loader._mapper.global.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return projection(_self, d)[0]; })
        .attr("cy", function(d) { return projection(_self, d)[1]; })
        .attr("r", 5)
        .style("fill", "red");
      });
    }
  };

  function projection(_self, d) {
    return _self.projection([d.lon, d.lat]);
  }

  return CSV;
}(jQuery));
