// inherit.js requires jQuery and the Regex Selector for jQuery by James Padolsey
// https://gist.github.com/fny/1887398
// credits to James Padolsey for the plugin

// get classes based on condition
function getClasses(e, n, regex) {
    var classes = "";
    e.attr('class').split(' ').forEach(function(f) {
        if (f.match(regex)) {
            classes += f.substring(n) + " ";
            e.removeClass(f);
        }
    });
    return classes;
}

// inherits classes based on "-"
var x = ':regex(class,(^-)|( -))';
while ($(x).length) {
    $(x).each(function() {
        $(this).children().not('.no-').addClass(getClasses($(this), 1, /^-/));
    });
}

// remove classes that starts with "no-"
var y = ':regex(class,(^no-)|( no-))';
while ($(y).length) {
    $(y).each(function() {
        $(this).removeClass(getClasses($(this), 3, /^no-/));
    });
}
