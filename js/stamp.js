Mapper.Stamp = (function ($) {
  "use strict";

  var defaultOptions = {
    duration : { searches: 1000,  orders: 5000 },
    delay    : { searches: 100,   orders: 100 },
    radius   : { searches: 1,     orders: 2 },
    color    : { searches: 'red', orders: 'green' }
  };

  function Stamp(_mapper, object, options) {
    this.options = $.extend({}, defaultOptions, options);

    this._mapper = _mapper;
    this.object  = object;

    this.from    = this.object.from;
    this.to      = this.object.to;
  }

  Stamp.prototype = {
    search: function () {
      var _self = this;

      _self._mapper.svg.append("circle")
        .attr("cx", function () { return fromQuadrants(_self)[0]; })
        .attr("cy", function () { return fromQuadrants(_self)[1]; })
        .attr("r", function () { return _self.options.radius.searches; })
        .attr("class", _self.id)
        .style("fill", function () { return _self.options.color.searches; })
        .transition()
        .duration(_self.options.duration.searches)
        .delay(_self.options.delay.searches)
        .attr("cx", function () { return toQuadrants(_self)[0]; })
        .attr("cy", function () { return toQuadrants(_self)[1]; });
    }
  };

  function fromQuadrants(_self) {
    return position(_self, _self.from.long, _self.from.lat);
  }

  function toQuadrants(_self) {
    return position(_self, _self.to.long, _self.to.lat);
  }

  function position(_self, x, y) {
    return _self._mapper.projection([x, y]); 
  }

  return Stamp;
}(jQuery));
