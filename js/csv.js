Mapper.CSV = (function ($) {
  "use strict";

  var defaultOptions = {
    cities : "support/cities.csv"
  };

  function CSV(_mapper, projection, options) {
    this.options = $.extend({}, defaultOptions, options);

    this._mapper = _mapper;
    this.projection = projection;
  }

  CSV.prototype = {
    load: function () {
      var _self = this;

      d3.csv(_self.options.cities, function(error, data) {
        _self._mapper.global.selectAll("circle")
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

// Mapper.JSON = (function ($) {
//   "use strict";

//   var defaultOptions = {
//     json : "support/world-110m2.json"
//   };

//   function JSON(_mapper, projection, options) {
//     this.options = $.extend({}, defaultOptions, options);

//     this._mapper = _mapper;
//     this.projection = projection;
//   }

//   JSON.prototype = {
//     load: function () {
//       var _self = this;

//       d3.json(_self.options.json, function(error, topology) {
//         new Mapper.CSV(_self._mapper, _self.projection, {}).load();

//         return topology;
//       });
//     }
//   };

//   return JSON;
// }(jQuery));
