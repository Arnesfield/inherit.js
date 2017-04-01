// inherit.js requires jQuery and the Regex Selector for jQuery by James Padolsey
// https://gist.github.com/fny/1887398
// credits to James Padolsey for the plugin

//self invoking function
(function() {
  // get classes based on condition
  function get(e, n, r) {
    var c = '';
    e.attr('class').split(' ').forEach(function(f) {
      if (f.match(r)) {
        c += f.substring(n) + ' ';
        e.removeClass(f);
      }
    });
    return c;
  }
  var x = ':regex(class,(^-)|( -))',
      y = ':regex(class,(^no-)|( no-))';
  // inherits classes based on "-"
  while ($(x).length) {
    $(x).each(function() {
      $(this).children().not('.no-').addClass(get($(this), 1, /^-/));
    });
  }
  // remove classes that starts with "no-"
  $(y).each(function() {
    $(this).removeClass(get($(this), 3, /^no-/));
  });
  // remove all empty class attributes
  $('*[class=""]').removeAttr('class');
})();
