const {test} = require('ava');
const mock = require('mock-require');
const Pharos = require('../src/pharos');

global.location = {protocol: 'https:'};
const timeout = (cb, t) => new Promise(resolve => {
  setTimeout(function() {
    cb();
    resolve();
  }, t);
});

test('pharos instance with site_id and host', async t => {
  global.addEventListener = (event, cb) => {
    t.is(event, 'load');
    cb();
  };

  t.plan(6);
  let pharos = new Pharos();
  t.is(pharos.site_id, undefined);
  t.is(pharos.host, undefined);

  pharos = new Pharos(333, 'imnerd.org');
  t.is(pharos.site_id, 333);
  t.is(pharos.host, 'imnerd.org');
});

test('pharos in stance add performance default', async t => {
  t.plan(2);
  mock('../src/performance', function() {
    return {a: 1};
  });
  const Pharos = mock.reRequire('../src/pharos');
  global.addEventListener = (event, cb) => {
    t.is(event, 'load');
    cb();
  };

  const pharos = new Pharos();
  await timeout(() => {
    t.deepEqual(pharos.search('a'), 1);
  });
  delete global.addEventListener;
  mock.stopAll();
});

test('pharos time', async t => {
  global.addEventListener = new Function();
  const pharos = new Pharos();
  pharos.time('aaa');
  await timeout(() => {
    pharos.timeEnd('aaa');
    t.true(Math.abs(pharos.search('aaa') - 300) < 10);
  }, 300);
});

test('pharos timeEnd', async t => {
  global.addEventListener = new Function();
  const pharos = new Pharos();
  pharos.timeEnd('bbb');
  t.is(pharos.search('bbb'), 0);
});

test('pharos add', async t => {
  const cases = [
    [undefined, undefined],
    [1, 1],
    [{aaa: '3'}, 1],
    [{aaa: 33}, 33]
  ];
  t.plan(cases.length);

  global.addEventListener = new Function();
  const pharos = new Pharos();
  cases.forEach(([val, expect]) => {
    if (typeof val !== 'object') {
      pharos.add('aaa', val);
    } else {
      pharos.add(val);
    }

    t.is(pharos.search('aaa'), expect);
  });
});

test('pharos delete', async t => {
  t.plan(8);
  global.addEventListener = new Function();
  const pharos = new Pharos();
  pharos.add({
    aaa: 1,
    bbb: 2,
    ccc: 3,
    ddd: 4
  });

  t.is(pharos.search('aaa'), 1);
  t.is(pharos.search('bbb'), 2);
  t.is(pharos.search('ccc'), 3);
  t.true(pharos.delete('aaa'));
  t.is(pharos.search('aaa'), undefined);
  t.true(pharos.delete('bbb', 'ccc'));
  t.is(pharos.search('bbb'), undefined);
  t.is(pharos.search('ccc'), undefined);
});

test('pharos clear', async t => {
  t.plan(2);

  global.addEventListener = new Function();
  const pharos = new Pharos();
  pharos.add({
    aaa: 1,
    bbb: 2
  });
  pharos.clear();
  t.deepEqual(pharos.search('aaa'), undefined);
  t.deepEqual(pharos.search('bbb'), undefined);
});

test('pharos search', async t => {
  t.plan(2);
  global.addEventListener = new Function();
  const pharos = new Pharos();
  pharos.add({
    aaa: 1
  });

  t.is(pharos.search('aaa'), 1);
  t.is(pharos.search('bbb'), undefined);
});

test('pharos monitor', async t => {
  t.plan(4);
  mock.stopAll();
  global.Image = new Function();
  global.addEventListener = (event, cb) => cb();
  global.screen = {width: 200, height: 200};
  let i = 0;

  mock('../src/util', {
    isEmpty() {
      return i === 0;
    },
    isNumber(args) {
      return typeof args === 'number';
    },
    build_query(params) {
      if (i === 0) {
        t.deepEqual(params, {
          site_id: 'site_id',
          info: {
            aaa: 111
          },
          screen: '200x200'
        });
        return 'first';
      } else {
        t.deepEqual(params, {
          site_id: 3,
          info: {
            a: 1,
            b: 2
          },
          screen: '200x200'
        });
        return 'second';
      }
    },
    sendLog(url) {
      if (i === 0) {
        t.is(url, 'http://host_test.com/api/disp?first');
      } else {
        t.is(url, 'https://pharos.eming.li/api/disp?second');
      }
    }
  });

  const Pharos = mock.reRequire('../src/pharos');
  const pharos = new Pharos('site_id', 'http://host_test.com');
  pharos.add('aaa', 111);
  await pharos.monitor();

  i++;
  pharos.site_id = 3;
  pharos.host = 'pharos.eming.li';
  await pharos.monitor({a: 1, b: 2});
  mock.stopAll();
});
