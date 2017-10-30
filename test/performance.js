const {test} = require('ava');
const getPerformance = require('../src/performance');

const performance = {
  'navigationStart': 1509374136124,
  'unloadEventStart': 0,
  'unloadEventEnd': 0,
  'redirectStart': 0,
  'redirectEnd': 0,
  'fetchStart': 1509374136617,
  'domainLookupStart': 1509374136153,
  'domainLookupEnd': 1509374136237,
  'connectStart': 1509374136237,
  'connectEnd': 1509374136252,
  'secureConnectionStart': 1509374136238,
  'requestStart': 1509374136253,
  'responseStart': 1509374136404,
  'responseEnd': 1509374136617,
  'domLoading': 1509374136618,
  'domInteractive': 1509374137026,
  'domContentLoadedEventStart': 1509374137026,
  'domContentLoadedEventEnd': 1509374137027,
  'domComplete': 1509374137290,
  'loadEventStart': 1509374137290,
  'loadEventEnd': 1509374137290
};

const times = {
  'loadPage': 1166,
  'domReady': 673,
  'redirect': 0,
  'lookupDomain': 84,
  'ttfb': 280,
  'request': 364,
  'loadEvent': 0,
  'appcache': -464,
  'unloadEvent': 0,
  'connect': 15
};

test('getperformance', t => {
  t.plan(2);

  t.deepEqual(getPerformance(), {});
  global.performance = {
    timing: performance
  };
  t.deepEqual(getPerformance(), times);
});
