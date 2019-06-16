const util = require('./util');
const performance = require('./performance');

const INFO = 'info';
const PERF = 'addPerfData';

const TIME_POOL = {};
module.exports = class Pharos {
  constructor(site_id, host, opt = {}) {
    this.site_id = site_id;
    this.host = host;
    this[INFO] = {
      screen: global.screen.width + 'x' + global.screen.height
    };
    this[PERF] = this.addPerf();

    this.listenError(opt);
  }

  listenError({ onError }) {
    if (!global.addEventListener) {
      return;
    }

    global.addEventListener('error', err => {
      if (!err) return;

      let message = (err.error && err.error.stack) || err.message;
      if (typeof onError === 'function') {
        message = onError(err);
      }
      if (!message) return;
      this.send(message);
    });

    global.addEventListener('unhandledrejection', reject => {
      if (!reject) return;

      let message = reject.reason;
      if (message instanceof Error) {
        message = (message.error && message.error.stack) || message.message;
      }

      if (typeof onError === 'function') {
        message = onError(reject);
      }
      if (!message) return;
      this.send(message);
    });
  }

  addPerf() {
    return new Promise(resolve =>
      global.addEventListener('load', () => setTimeout(() => {
        this.add(performance());
        resolve();

        this[PERF] = Promise.resolve();
      }))
    );
  }

  monitor(info) {
    return this[PERF].then(() => this.send(info));
  }

  send(info = this[INFO]) {
    let host = this.host;
    if (!/^(http|\/\/)/i.test(host)) {
      host = location.protocol + '//' + host;
    }

    const baseUrl = `${host}/pharos.gif?`;
    util.sendLog(baseUrl + util.build_query({
      site_id: this.site_id,
      ...info
    }));

    this.clear();
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
    if (util.isNumber(val)) {
      data = { [key]: val };
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
    for (let i = 0; i < infoKeys.length; i++) {
      delete this[INFO][infoKeys[i]];
    }
    return true;
  }

  clear() {
    const data = {};
    for (const k in this[INFO]) {
      data[k] = this[INFO][k];
      this.delete(k);
    }
    return data;
  }

  search(key) {
    return this[INFO][key];
  }
};
