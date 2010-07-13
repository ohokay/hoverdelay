/*

  Hover Delay
  
    Written by Jeff Mehlhoff, July 2010
    jeffmehlhoff@me.com    
  
*/

(function($) {
  
  $.fn.hoverDelay = function(opts) {
        
    // base config
    var config = {
      delay : 700,
      initialize : function() { },
      enter      : function() { },
      done       : function() { },
      out        : function() { },
      delayedOut : function() { }
    }
    
    $.extend(config, opts);
    var obj = $(this);
    var delayTimeout; var outTimeout;
    var pX; var pY;
    
    /* ---------- Helper methods */
    
    $.cancelHoverDelay = function() {
      clearTimeout(delayTimeout);
      clearTimeout(outTimeout);
    }
    
    function unbindMouseMove() {
      obj.unbind('mousemove', mouseMove);
    }
    
    function clearDifferenceTimeout() {
      clearTimeout(delayTimeout);
    }
    
    /* ---------- Binding methods */
    
    var difference = function(e) {
      clearDifferenceTimeout();
      delayTimeout = setTimeout(function(){
        if((e.pageX === pX) && (e.pageY === pY)) {
          unbindMouseMove();
          config.done(e);
        }
      }, config.delay);
    }
    
    var mouseMove = function(e) {
      pX = e.pageX;
      pY = e.pageY;
      difference(e);
    }
    
    var mouseEnter = function(e) {
      clearTimeout(outTimeout);
      obj.bind('mousemove', mouseMove);
      config.enter(e);
    }
    
    var mouseOut = function(e) {
      clearDifferenceTimeout(); 
      unbindMouseMove();
      outTimeout = setTimeout(function(){
        config.delayedOut();
      }, config.delay);
      config.out(e);
    }
    
    /* ---------- Core functions */
    
    function init() {
      obj.live('mouseenter', mouseEnter);
      obj.live('mouseout', mouseOut);
      config.initialize();
    }
    
    init(); // get the party started
    
  }
  
})(jQuery);