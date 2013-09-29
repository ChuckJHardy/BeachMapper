Mapper.World = (function ($) {
  "use strict";

  var defaultOptions = {
    json : "support/world.json"
  };

  function World(_mapper, options) {
    this.options = $.extend({}, defaultOptions, options);

    this._mapper = _mapper;
  }

  World.prototype = {
    load: function () {
      var _self = this;

      d3.json(_self.options.json, function(error, world) {
        selectAllPath(_self, world);
      });
    }
  };

  function selectAllPath(_self, world) {
    _self._mapper.svg.selectAll(".country")
      .data(countries(_self, world))
      .enter()
      .insert("path")
      .attr("class", "country")
      .attr("d", _self._mapper.path);
  }

  function countries(_self, world) {
    return topojson.feature(world, world.objects.countries).features;
  }

  function neighbors(_self, world) {
    return topojson.neighbors(world.objects.countries.geometries);
  }

  return World;
}(jQuery));
