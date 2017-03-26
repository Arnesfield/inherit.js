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
while ($(':regex(class,(^-)|( -))').length) {
    $(':regex(class,(^-)|( -))').each(function() {
        $(this).children().not('.no-').addClass(getClasses($(this), 1, /^-/));
    });
}

// remove classes that starts with "no-"
while ($(':regex(class,(^no-)|( no-))').length) {
    $(':regex(class,(^no-)|( no-))').each(function() {
        $(this).removeClass(getClasses($(this), 3, /^no-/));
    });
}
