Mapper.JSON = (function ($) {
  "use strict";

  var defaultOptions = {
    center : { x : 0, y : 45 },
    scale  : 307,
    rotate : { x : 35, y : 0 },
    json   : "support/world-110m2.json"
  };

  function JSON(_mapper, options) {
    this.options = $.extend({}, defaultOptions, options);

    this._mapper = _mapper;
  }

  JSON.prototype = {
    load: function () {
      var _self = this;

      d3.json(_self.options.json, function(error, topology) {
        new Mapper.CSV(_self, projection(_self), {}).load();
        selectAllPath(_self, topology);
      });
    }
  };

  function path(_self) {
    return d3.geo.path().projection(projection(_self));
  }

  function selectAllPath(_self, topology) {
    _self._mapper.global.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries).geometries)
      .enter()
      .append("path")
      .attr("d", path(_self));
  }

  function projection(_self) {
    return d3.geo.mercator()
      .center([ _self.options.center.x, _self.options.center.y ])
      .rotate([ _self.options.rotate.x, _self.options.rotate.y ])
      .scale(_self.options.scale);
  }

  return JSON;
}(jQuery));
