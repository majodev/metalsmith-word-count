var path = require('path');
var expect = require('chai').expect;
var Metalsmith = require('metalsmith');

var wordcount = require('..');

describe('metalsmith-word-count', function() {
  it('can count 30000 words accurately and estimates 100min reading time', function(done) {
    Metalsmith('spec/fixture')
      .use(wordcount())
      .build(function(err, files) {
        if (err) {
          console.error(err);
        }

        // Standard settings are 300 words per 1 Minute, test that
        expect(files["30000words.html"].wordCount).to.be.equal(30000);
        expect(files["30000words.html"].readingTime).to.be.equal("100 min");
        done();
      });
  });
  it('can change reading speed and output also seconds', function(done) {
    Metalsmith('spec/fixture')
      .use(wordcount({
        speed: 600,
        seconds: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err);
        }

        // 600 words per min = 50min (30000 words) = 3000 sec
        expect(files["30000words.html"].readingTime).to.be.equal("50 minutes, 0 seconds");
        done();
      });
  });
  it('metakeys can be changed', function(done) {
    Metalsmith('spec/fixture')
      .use(wordcount({
        metaKeyCount: "myCustomWordCountKey",
        metaKeyReadingTime: "myCustomReadingTimeKey"
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err);
        }

        expect(files["30000words.html"].myCustomWordCountKey).to.be.equal(30000);
        expect(files["30000words.html"].myCustomReadingTimeKey).to.be.equal("100 min");
        done();
      });
  });
  it('estimate can also be returned as raw minutes', function(done) {
    Metalsmith('spec/fixture')
      .use(wordcount({
        raw: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err);
        }

        expect(files["30000words.html"].readingTime).to.be.equal(100);
        expect(files["30000words.html"].wordCount).to.be.equal(30000);
        done();
      });
  });
  it('estimate can also be returned as raw seconds', function(done) {
    Metalsmith('spec/fixture')
      .use(wordcount({
        raw: true,
        seconds: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err);
        }

        expect(files["30000words.html"].readingTime).to.be.equal(6000);
        expect(files["30000words.html"].wordCount).to.be.equal(30000);
        done();
      });
  });
});