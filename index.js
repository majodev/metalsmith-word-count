var cheerio = require('cheerio');
var _ = require('lodash');
var extname = require('path').extname;
var multimatch = require('multimatch');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to compute wordcount / average reading time of all paragraphs in a html file
 * based on assemble-middleware-wordcount by Jon Schlinkert https://github.com/assemble/assemble-middleware-wordcount
 * @return {Function}
 */

function plugin(options) {
  return function(files, metalsmith, done) {
    var opts = options || {};

    // setup defaults

    opts.speed = opts.speed || 300; // See http://onforb.es/1crk3KF
    opts.seconds = opts.seconds || false; // if output should include seconds (formatted "x minutes, x seconds")
    opts.raw = opts.raw || false; // if output should be raw integers (without min or sec)
    opts.metaKeyCount = opts.metaKeyCount || "wordCount";
    opts.metaKeyReadingTime = opts.metaKeyReadingTime || "readingTime";
    opts.pattern = opts.pattern || "*"

    setImmediate(done);
    Object.keys(files)
      .filter(function (p) {
        // Filter by the pattern option
        return multimatch(p, opts.pattern).length > 0
     })
     .forEach(function(p) {
        var processedCounts = count(files[p].contents, opts);
        files[p][opts.metaKeyCount] = processedCounts.count;
        files[p][opts.metaKeyReadingTime] = processedCounts.est;
     });
   };
}

function count(contents, opts) {
  var matches = (""+contents).match(/[\u0400-\u04FF]+|\S+\s*/g);
  var count = matches !== null ? matches.length : 0;

  // Calculate reading time
  var min, mins, sec, secs, est;
  if (opts.seconds === true) {
    min = Math.floor(count / opts.speed);
    sec = Math.floor(count % opts.speed / (opts.speed / 60));
    if (opts.raw === false) {
      mins = min + ' minute' + (min === 1 ? '' : 's') + ', ';
      secs = sec + ' second' + (sec === 1 ? '' : 's');
      est = (min > 0) ? mins + secs : secs;
    } else {
      est = (min * 60) + sec;
    }
  } else {
    min = Math.ceil(count / opts.speed);
    if (opts.raw === false) {
      est = min + ' mn';
    } else {
      est = min;
    }
  }

  return {
    count: count,
    est: est
  };
}
