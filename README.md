#metalsmith-word-count

> Metalsmith plugin to compute wordcount / average reading time of all paragraphs in a html file.  

Based on [assemble-middleware-wordcount by Jon Schlinkert](https://github.com/assemble/assemble-middleware-wordcount)  
Extracted from [majodev.github.io](http://majodev.github.io).

As part the my note *"[Extracting libs from a node.js project: Publishing my metalsmith plugins](http://ranf.tl/2014/10/01/extracting-libs-from-a-node-js-project/)"*.

## Installation

```bash
npm install --save metalsmith-word-count
```

## Usage

```javascript
var Metalsmith = require("metalsmith");
var wordcount = require("metalsmith-word-count");


Metalsmith(__dirname)
  // html files are available (e.g. state when markdown was compiled)
  .use(wordcount())
  // ...
```

Should also work in similar fashion with the `metalsmith.json` counterpart.

## Options

`wordcount` accepts an hash to provide a few customization options.

### `metaKeyCount` (optional)
`String`: Name of the key that will store the word count in a file's metadata.  
default: `wordCount`

### `metaKeyReadingTime` (optional)
`String`: Name of the key that will store the estimated reading time in a file's metadata.  
default: `readingTime`

### `speed` (optional)
`int`: How fast one normally reads, see http://onforb.es/1crk3KF  
default: `300`

### `seconds` (optional)
`bool`: If readingTime should be outputted in seconds  
default: `false`

### `raw` (optional)
`bool`: If readingTime should be returned as raw integer (in minutes or seconds)  
default: `false`

## Full example with options set

```javascript
Metalsmith(__dirname)
  // html files are available (e.g. state when markdown was compiled)
  .use(wordcount({
    metaKeyCount: "wordCount",
    metaKeyReadingTime: "readingTime",
    speed: 300,
    seconds: false,
    raw: false
  }))
  // ...
```


## Problems?
File an issue or fork 'n' fix and send a pull request.

## License
(c) 2014 Mario Ranftl  
[MIT License](majodev.mit-license.org)
