const { test } = require('ava');

global.location = { protocol: 'https:' };
global.screen = {
  width: 1024,
  height: 768
};

test('main normal', t => {
  t.plan(9);
  global.document = {
    querySelector(selector) {
      t.is(selector, 'script[data-siteid][data-host]');
      return {
        getAttribute(attr) {
          if (attr === 'data-siteid') {
            t.pass();
            return 3;
          } else if (attr === 'data-host') {
            t.pass();
            return 'pharos.eming.li';
          }
        }
      };
    }
  };
  global.addEventListener = (event, cb) => {
    t.true(['load', 'error', 'unhandledrejection'].includes(event));
    cb();
  };
  const main = require('../src/main');
  t.is(main.site_id, 3);
  t.is(main.host, 'pharos.eming.li');
});
