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

Each level consists of a map file and level description.

In map files you could use any symbols as a space symbol, except pre-defined in map.js:
```javascript
'#': 'wall',
'$': 'wall',
' ': 'space',
'_': 'start',
'f': 'finish'
```

Each level described in levels/levels.json in this way:
```json
{
  "name": "Conditional demolition",
  "map": {
    "width": 11,
    "height": 3,
    "file": "levels/maps/basics-conditional-demolition.map",
    "mapfunc": "var f = function() {for(var i = 0; i<this.options.width; i++) {for (var j = 0; j<this.options.height; j++) {if(this.base[i][j].symbol === '#') {this.base[i][j].color = 'grey'} else if(/^\\d+$/.test(this.base[i][j].symbol)){this.base[i][j].color = 'lime'} else if(this.base[i][j].symbol === 'f'){this.base[i][j].color = '#f0f0f0'}  }}; this.redraw();}"
  },
  "runnerfunc": "(function(code) { if(/steps|counter/.test(code)) {throw new Error('Robot: that would be very easy... You can do it without using steps or counter variables. By the way, do you know, that R is an object, and objects can have properties?.');}} )(code);",
  "description": "<p><span class='story'>*Mechanical voice*:</span></p><p><span class='story'>&mdash; Some closed doors would stop you. For centuries.</span></p><p><br></p><p></p>",
  "before": "var counter = 0; var steps=0;\nintervals.push(\n    setInterval(function(){\n        try {",
  "code": "var key = '';",
  "after": "\n            steps++;\n            if(R.standingOn('1')){\n                counter++;\n            } if( (steps === 4) &&\n                (R.standingOn('1')) &&\n                (counter<=2) )\n            {\n                R.destroy('right');\n            }\n            if((R.standingOn('2')) &&\n                (/^<(.{1})>\\1<(.{1})>\\2<(.{1})>\\3$/).test(key)) \n            {\n                R.destroy('right');\n            }\n        } catch(e) {\n            error(e, intervals, R);\n        }\n    },200)\n);"
}
```

"mapfunc" is a function that will run in a context of a map object. You can use it for colouring, for example.
"runnerfunc" used to create more restrictions in level, for example, throw a custom error when user trying to use some variable etc.
"description" is a level description. In it you can use a ```<p></p>``` tag for paragraph, ```<span class='story'></span>``` for story and ```<span class='code'></span>``` for code blocks.
"before" and "after" is javascript code that frames the user code. See an examples to find out what you can use in it. You are the javascript programmer, aren't you?
