const {test} = require('ava');
const util = require('../src/util');

test('is-number', t => {
  const cases = [
    [0, true],
    [1, true],
    [NaN, false],
    ['1', false],
    [true, false],
    [{}, false]
  ];
  t.plan(cases.length);
  cases.forEach(([val, expect]) => {
    t.is(util.isNumber(val), expect);
  });
});

test('is-empty', t => {
  const cases = [
    ['', true],
    ['1', false],
    [{}, true],
    [{a: 1}, false]
  ];
  t.plan(cases.length);
  cases.forEach(([val, expect]) => {
    t.is(util.isEmpty(val), expect);
  });
});

test('build-query-normal', t => {
  const cases = [
    [{a: 1}, 'a=1'],
    [{a: 1, b: 2}, 'a=1&b=2'],
    [{a: {a: 1}, b: 2}, 'a=%7B%22a%22%3A1%7D&b=2'],
    [{'你': '好', b: 2}, '%E4%BD%A0=%E5%A5%BD&b=2']
  ];
  t.plan(cases.length);
  cases.forEach(([val, expect]) => {
    t.is(util.build_query(val), expect);
  });
});

test('getPerformance', t => {
  // eslint-disable-next-line no-console
  console.log = function() {
    t.pass();
  };
  util.getPerformance();
});

test('getPerformance-normal', t => {
  global.performance = 666;
  const performance = util.getPerformance();
  t.is(performance, global.performance);
});

test('sendLog', t => {
  t.plan(6);
  t.is(util.sendLog(), undefined);
  t.is(global.sadLog, undefined);
  global.Image = function() {};
  util.sendLog('123');
  t.is(global.sadLog.src, '123');
  t.is(global.sadLog.onload, global.sadLog.onerror);
  t.true(typeof global.sadLog.onload === 'function');
  global.sadLog.onload();
  t.is(global.sadLog, undefined);
});
