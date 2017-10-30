const util = require('./util');
const performance = require('./performance');

const INFO = Symbol('info');
const TIME_POOL = {};
module.exports = class Pharos {
  constructor(site_id, host) {
    this.site_id = site_id;
    this.host = host;
    this[INFO] = {};

    global.addEventListener('load', () => {
      setTimeout(() => {
        this.add(performance());
      })
    });
  }

  monitor(info) {
    const baseUrl = `//${this.host}/api/disp?`;
    const params = {
      site_id: this.site_id,
      info: util.isEmpty(info) ? this[INFO] : info,
      screen: global.screen.width + 'x' + global.screen.height
    };
    util.sendLog(baseUrl + util.build_query(params));
  }

  time(name) {
    TIME_POOL[name] = Date.now();
  }

  timeEnd(name) {
    const now = Date.now();
    if (!TIME_POOL[name]) {
      TIME_POOL[name] = now;
    }

    const delta = now - TIME_POOL[name];
    this.add(name, delta);
    // eslint-disable-next-line no-console
    console.log(`${name}: ${delta}ms`);
    delete TIME_POOL[name];
  }

  add(key, val) {
    let data = key;
    if (val) {
      data = {[key]: val};
    }

    for (const k in data) {
      if (!util.isNumber(data[k])) {
        continue;
      }
      this[INFO][k] = data[k];
    }
    return true;
  }

  delete(...infoKeys) {
    if (!this[INFO]) return;

    for (const k of infoKeys) {
      delete this[INFO][k];
    }
    return true;
  }

  search(key) {
    if (!this[INFO]) return;
    return this[INFO][key];
  }
};
