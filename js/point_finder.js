Mapper.PointFinder = (function ($) {
  "use strict";

  function PointFinder(_mapper) {
    this._mapper = _mapper;
  }

  PointFinder.prototype = {
    report: function () {
      var _self = this;

      d3.select("svg").on("mousedown.log", function() {
        console.log(_self._mapper.projection.invert(d3.mouse(this)));
      });
    }
  };

  return PointFinder;
}(jQuery));
