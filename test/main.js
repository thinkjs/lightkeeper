const {test} = require('ava');
test('main normal', t => {
  t.plan(7);
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
    t.is(event, 'load');
    cb();
  };
  const main = require('../src/main');
  t.is(main.site_id, 3);
  t.is(main.host, 'pharos.eming.li');
});
