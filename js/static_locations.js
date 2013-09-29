Mapper.StaticLocations = (function ($) {
  "use strict";

  var defaultOptions = {
    locations : "support/locations.json"
  };

  function StaticLocations(_mapper, options) {
    this.options = $.extend({}, defaultOptions, options);
    this._mapper = _mapper;
  }

  StaticLocations.prototype = {
    load: function () {
      var _self = this;

      d3.json(_self.options.locations, function(error, loc) { 
        loadObjects(_self, loc); 
      });
    }
  };

  function loadObjects(_self, data) {
    objects(_self, data)
      .attr("cx", function (d) { return position(_self, d)[0]; })
      .attr("cy", function (d) { return position(_self, d)[1]; })
      .attr("r", function (d) { return d.radius; })
      .style("fill", function (d) { return d.color; });
  }

  function objects(_self, data) {
    return _self._mapper.svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle");
  }

  function position(_self, d) {
    return _self._mapper.projection([d.long, d.lat]); 
  }

  return StaticLocations;
}(jQuery));
