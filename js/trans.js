(function() {
  /*
   Swipe 1.0
   Brad Birdsall, Prime
   Copyright 2011, Licensed GPL & MIT
  */
  var Trans;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Trans = (function() {
    function Trans(element, options) {
      this.options = options != null ? options : {};
      if (!element) {
        return null;
      }
      this.index = this.options.startSlide || 0;
      this.speed = this.options.speed || 400;
      this.callback = this.options.callback || function() {};
      this.delay = this.options.auto || 0;
      this.container = element;
      this.element = this.container.getElementsByTagName("ul")[0];
      this.setup();
      this.start();
      this.element.addEventListener("webkitTransitionEnd", this, false);
      this.element.addEventListener("msTransitionEnd", this, false);
      this.element.addEventListener("oTransitionEnd", this, false);
      this.element.addEventListener("transitionend", this, false);
      window.addEventListener("resize", this, false);
    }
    Trans.prototype.setup = function(ev) {
      var el, index, _results;
      this.slides = this.element.getElementsByTagName("li");
      this.length = this.slides.length;
      if (this.length < 2) {
        return null;
      }
      this.width = this.options.width || this.container.getBoundingClientRect().width;
      this.element.style.width = (this.slides.length * this.width) + "px";
      index = this.slides.length;
      _results = [];
      while (index--) {
        el = this.slides[index];
        el.style.width = this.width + "px";
        el.style.display = "table-cell";
        _results.push(el.style.verticalAlign = "top");
      }
      return _results;
    };
    Trans.prototype.slide = function(index, duration) {
      var style;
      $(this.element).trigger("slideEvent", index);
      duration = duration || this.speed;
      style = this.element.style;
      style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + "ms";
      style.webkitTransform = "translate3d(" + -(index * this.width) + "px,0,0)";
      style.msTransform = style.MozTransform = style.OTransform = "translateX(" + -(index * this.width) + "px)";
      return this.index = index;
    };
    Trans.prototype.getPos = function() {
      return this.index;
    };
    Trans.prototype.prev = function(delay) {
      this.delay = delay || 0;
      clearTimeout(this.interval);
      if (this.index === 0) {
        return this.slide(this.length - 1, this.speed);
      } else {
        if (this.index) {
          return this.slide(this.index - 1, this.speed);
        }
      }
    };
    Trans.prototype.next = function(delay) {
      this.delay = delay || 0;
      clearTimeout(this.interval);
      if (this.index < this.length - 1) {
        return this.slide(this.index + 1, this.speed);
      } else {
        return this.slide(0, this.speed);
      }
    };
    Trans.prototype.start = function() {
      return this.interval = (this.delay ? setTimeout(__bind(function() {
        return this.next(this.delay);
      }, this), this.delay) : 0);
    };
    Trans.prototype.handleEvent = function(e) {
      switch (e.type) {
        case "webkitTransitionEnd":
        case "msTransitionEnd":
        case "oTransitionEnd":
        case "transitionend":
          return this.transitionEnd(e);
        case "resize":
          return this.setup("resize");
      }
    };
    Trans.prototype.transitionEnd = function(e) {
      if (this.delay) {
        this.start();
      }
      return this.callback(e, this.index, this.slides[this.index]);
    };
    return Trans;
  })();
  window.Trans = Trans;
}).call(this);
