/*! inherit.js v2.0 | Jefferson Rylee - https://github.com/Arnesfield/inherit.js | Free */

var inherit = function() {

  // default arguments
  var a = arguments,
      r = a[0] ? a[0] : '-',
      e = a[1] ? a[1] : '.no-',
      c = a[2] ? a[2] : 'no-';

  // functions
  function getRegex(r) {
    return '(^'+r+')|( '+r+')';
  }

  // get classes that match r
  function getClasses(elem, r) {
    var regex = getRegex(r), child = [];
    var orig = elem.attr('class').split(' ').filter(function(e) {
      if (e.match(regex)) {
        child.push(e.substring(r.length));
        return true;
      }
    });

    return {
      orig: orig.join(' '),
      child: child.join(' ')
    };
  }

  // get elements with classes that match r
  function getElem(r) {
    var regex = getRegex(r);
    return $('[class]').filter(function() {
      return $(this).attr('class').match(regex);
    });
  }

  // execute here
  $(function() {
    var elem;

    // elements with r regex
    while ((elem = getElem(r)) && elem.length) {
      elem.each(function() {
        var obj = getClasses($(this), r);
        
        // apply changes
        $(this).removeClass(obj.orig);
        $(this).children().not(e).addClass(obj.child);
      });
    }

    // elements with c regex
    getElem(c).each(function() {
      var obj = getClasses($(this), c);
      $(this).removeClass(obj.orig + ' ' + obj.child);
    });

    // remove all empty class attributes
    $('*[class=""]').removeAttr('class');
  });

}

// default call
inherit();
