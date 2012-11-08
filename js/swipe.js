(function() {
  /*
   Swipe 1.0
   Brad Birdsall, Prime
   Copyright 2011, Licensed GPL & MIT
  */
  var Swipe;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Swipe = (function() {
    __extends(Swipe, Trans);
    function Swipe(element, options) {
      Swipe.__super__.constructor.call(this, element, options);
      this.element.addEventListener("touchstart", this, false);
      this.element.addEventListener("touchmove", this, false);
      this.element.addEventListener("touchend", this, false);
    }
    Swipe.prototype.handleEvent = function(e) {
      Swipe.__super__.handleEvent.call(this, e);
      switch (e.type) {
        case "touchstart":
          return this.onTouchStart(e);
        case "touchmove":
          return this.onTouchMove(e);
        case "touchend":
          return this.onTouchEnd(e);
      }
    };
    Swipe.prototype.onTouchStart = function(e) {
      clearTimeout(this.interval);
      this.start = {
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY,
        time: Number(new Date())
      };
      this.isScrolling = undefined;
      this.deltaX = 0;
      return this.element.style.webkitTransitionDuration = 0;
    };
    Swipe.prototype.onTouchMove = function(e) {
      this.deltaX = e.touches[0].pageX - this.start.pageX;
      if (typeof this.isScrolling === "undefined") {
        this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY));
      }
      if (!this.isScrolling) {
        e.preventDefault();
        this.deltaX = this.deltaX / (!this.index && this.deltaX > 0 || this.index === this.length - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
        return this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)";
      }
    };
    Swipe.prototype.onTouchEnd = function(e) {
      var isPastBounds, isValidSlide;
      isValidSlide = Number(new Date()) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2;
      isPastBounds = !this.index && this.deltaX > 0 || this.index === this.length - 1 && this.deltaX < 0;
      if (!this.isScrolling) {
        return this.slide(this.index + (isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0), this.speed);
      }
    };
    return Swipe;
  })();
  window.Swipe = Swipe;
}).call(this);
