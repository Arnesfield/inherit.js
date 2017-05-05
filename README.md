# inherit.js
Simple JavaScript tool for CSS to inherit (pass) classes from a parent to its children.

## Introduction
Inherit.js uses hyphens (-) on classes in order for it to work.

You won't need to repeat classes everytime. Inherit.js will do the work for you.

#### Requirements
- jQuery
- [Regex Selector for jQuery by James Padolsey](https://gist.github.com/fny/1887398)

Inherit.js uses the Regex Selector to query elements based on some expression.

#### The code
```javascript
// on ready
$(function() {
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
})

```

## Usage
### Add scripts
Add the required scripts either before the closing of the **body** tag or inside the **head**.
```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.regex-selector.js"></script>
<script src="/path/to/inherit.js"></script>
```
### Using *inherit.js*
In order to use, simply append a hyphen (-) before a class.
```html
<!-- before -->
<div class="-some">
  <h1>inherit</h1>
</div>

<!-- after -->
<div>
  <h1 class="some">inherit</h1>
</div>
```
The hyphen indicates class passing. A hyphen passes the hyphenated class to its direct children.

Here's another example:
```html
<!-- before -->
<div class="row -col">
  <div>col1</div>
  <div>col2<div>
  <div>col3</div>
</div>

<!-- after -->
<div class="row">
  <div class="col">col1</div>
  <div class="col">col2</div>
  <div class="col">col3</div>
</div>
```

### Children of children
The number of hyphens appended before a class determines how deep down the tree a hyphenated class is to be passed.

With 1 hyphen (-), a hyphenated class will be passed to the direct children of the parent element.
With 2 or more hyphens, hyphenated classes will be passed to children of children, and it goes on.

Here's an example:
```html
<!-- before -->
<div class="row -col --some">
  <div>
    <div></div>
  </div>
  <div>
    <div></div>
  </div>
</div>

<!-- after -->
<div class="row">
  <div class="col">
    <div class="some"></div>
  </div>
  <div class="col">
    <div class="some"></div>
  </div>
</div>
```
The **col** class will be passed to the direct children of the **row** div, and the **some** class will be passed to the direct children of the **col** divs.

### The *"no-"* class
The **no-** class **does not** allow class passing to that element and its children.

Let's use the example above and add the **no-** class in the example:
```html
<!-- before -->
<div class="row -col --some">
  <div>
    <div></div>
  </div>
  <div class="no-">
    <div></div>
  </div>
</div>

<!-- after -->
<div class="row">
  <div class="col">
    <div class="some"></div>
  </div>
  <div>
    <div></div>
  </div>
</div>
```
The element with the **no-** class and its children were not affected by class passing.

Elements with **no-** class can have other classes and can also pass classes to their children.
```html
<!-- before -->
<div class="-some">
  <div></div>
  <div class="no- -some">
    <div></div>
    <div></div>
  </div>
</div>

<!-- after -->
<div>
  <div class="some"></div>
  <div>
    <div class="some"></div>
    <div class="some"></div>
  </div>
</div>
```

### The *"no-CLASS"* class
The **no-CLASS** class will remove any *CLASS* succeeding the **no-** keyword.
```html
<!-- before -->
<div class="row -col -some">
  <div class="no-some"></div>
  <div></div>
</div>

<!-- after -->
<div class="row">
  <div class="col"></div>
  <div class="col some"></div>
</div>
```
The element with the **no-some** class removes the **some** class that was passed to it.

The **no-CLASS** class also applies even without class passing, but doing it this way is quite inefficient.
```html
<!-- before -->
<div class="row no-row"></div>

<!-- after -->
<div></div>
```
## Note
You are free to use **inherit.js** whenever you want. Have fun and happy coding!
