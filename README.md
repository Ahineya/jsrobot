# jsrobot

JavaScript challenges web application

## How To Install

Requires Node.js

Clone or download this repository.

Quickly get started from scratch by navigating to the repository folder and running;

```
npm install
npm start
```

Open a browser at [localhost:8090](http://localhost:8090/)

## Adding Levels

If you want to add a level, send pull-request with it.

Each level is a .jsrl (jsrobot level) file.
See /jsrl/test.jsrl file.

It is an xml-look-like file.
Do not put a space characters before and after tag content, 
except the tag content is a function or part of javascript code.

Run ```npm install``` from root of the project for rebuilding levels.
test.jsrl file is skipped while building.
If you can suggest a better way of running level rebuild - please, create an issue.

It needs to have such parameters:

```group``` - a group you want to add this level

```name``` - level name

```description``` - is a level description. In it you can use a ```<p></p>``` tag for paragraph, ```<span class='story'></span>``` for story and ```<span class='code'></span>``` for code blocks.
    
```map.file``` - map file name.

```map.mapcontent``` - map file content.

```map.mapfunc``` - is a function that will run in a context of a map object. You can use it for colouring, for example.

```runnerfunc``` - used to create more restrictions in level, for example, throw a custom error when user trying to use some variable etc.

```before``` and ```after``` - javascript code that frames the user code. See an examples to find out what you can use in it. You are the javascript programmer, aren't you?

```code``` - if you want, you can specify already written code in code field.

```html
<group>Advanced</group>
<name>Test</name>
<description><p>Test description</p></description>
<map.file>test-created.map</map.file>
<map.mapcontent>#####
#   #
# _ #
#  f#
#####</map.mapcontent>
<map.width>5</map.width>
<map.height>5</map.height>
<map.mapfunc>
var f = function() {
    for(var i = 0; i<this.options.width; i++) {
        for (var j = 0; j<this.options.height; j++) {
            if(this.base[i][j].symbol === '#') {
                this.base[i][j].color = 'grey';
            } else if (/^\\d+$/.test(this.base[i][j].symbol)) {
                this.base[i][j].color = 'lime';
            } else if(this.base[i][j].symbol === 'f') {
                this.base[i][j].color = '#f0f0f0';
            }
        }
    };
    this.redraw();
}
</map.mapfunc>
<runnerfunc>
(function(code) {
    if(/steps|counter/.test(code)) {
        throw new Error('Robot: that would be very easy... You can do it without using steps or counter variables. By the way, do you know, that R is an object, and objects can have properties?.');
    }
})(code);
</runnerfunc>
<before>
var counter = 0;
var steps=0;
intervals.push(
    setInterval(function() {
        try {
</before>
<code>

</code>
<after>

            steps++;
            if(R.standingOn('1')){
                counter++;
            }
            if( (steps === 4) &&
                (R.standingOn('1')) &&
                (counter<=2) )
                {
                    R.destroy('right');
                }
            if((R.standingOn('2')) &&
                (/^<(.{1})>\\1<(.{1})>\\2<(.{1})>\\3$/).test(key))
                {
                    R.destroy('right');
                }
        } catch(e) {
            error(e, intervals, R);
        }
    },200)
);
</after>
```

In map files you could use any symbols as a space symbol, except pre-defined in map.js:
```javascript
'#': 'wall',
'$': 'wall',
' ': 'space',
'_': 'start',
'f': 'finish'
```
