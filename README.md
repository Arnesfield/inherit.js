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
```

## Usage
### Add scripts
Add the requirements before the closing of the **body** tag.
```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.regex-selector.js"></script>
<script src="/path/to/inherit.js"></script>
```
### Using *inherit.js*
In order to use, simple append a hyphen (-) before a class.
```html
<div class="-some">
  <h1>inherit</h1>
</div>
```
This will be equivalent to the following:
```html
<div class>
  <h1 class="some">inherit</h1>
</div>
```
Now this works for every children. Here's another example:
```html
<div class="row -col">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```
And again, it will be equivalent to the following:
```html
<div class="row">
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```
### Children of children
These the number of hyphens added before a class determines how deep down the tree a class is supposed to be passed to.

With 1 hyphen (-), a class will be passed to the children of the parent element like the examples above.
But with 2 or more hyphens, classes will be passed to children of children, and it goes on.

Here's an example:
```html
<div class="row -col --some">
  <div>
    <div></div>
  </div>
  <div>
    <div></div>
  </div>
</div>
```
The **col** class will be passed to the direct children of the **row** div, and the **some** class will be passed to the direct children of the **col** divs.

Here's how it looks like:
```html
<div class="row">
  <div class="col">
    <div class="some"></div>
  </div>
  <div class="col">
    <div class="some"></div>
  </div>
</div>
```
### The *"no-"* class
The **no-** class **does not** allow the class passing to the element and its children.

Let's use the example above and add the **no-** class in the example:
```html
<div class="row -col --some">
  <div>
    <div></div>
  </div>
  <div class="no-">
    <div></div>
  </div>
</div>
```
And here's the result:
```html
<div class="row">
  <div class="col">
    <div class="some"></div>
  </div>
  <div class>
    <div></div>
  </div>
</div>
```
The element with the **no-** class and its children was not affected by the class passing.

 The class with the **no-** class still has the **class** attribute that can be seen in Chrome's inspect element tool. (hopefully this won't cause much problems).

Elements with **no-** class can have other classes, too. They can also pass classes to their children.
```html
<div class="-some">
  <div></div>
  <div class="no- -some">
    <div></div>
    <div></div>
  </div>
</div>
```
This will result to the following:
```html
<div class>
  <div class="some"></div>
  <div class>
    <div class="some"></div>
    <div class="some"></div>
  </div>
</div>
```
### The *"no-CLASS"* class
This class will remove any *CLASS* succeeding the **no-** class keyword.

Here's an example:
```html
<div class="row -col -some">
  <div class="no-some"></div>
  <div></div>
</div>
```
And this will be equivalent to:
```html
<div class="row">
  <div class="col"></div>
  <div class="col some"></div>
</div>
```
The element with the **no-some** class removes the **some** class that was passed to it.

The **no-CLASS** class also applies even without class passing.
```html
<div class="row no-row"></div>
```
Will result to:
```html
<div class></div>
```
But doing it this way is quite inefficient.
## Note
You are free to use **inherit.js** whenever you want. Have fun and happy coding!
