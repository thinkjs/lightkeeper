# lightkeeper

[![npm](https://img.shields.io/npm/v/lightkeeper.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/thinkjs/lightkeeper.svg?style=flat-square)]()
[![Coveralls](https://img.shields.io/coveralls/thinkjs/lightkeeper/master.svg?style=flat-square)]()
[![David](https://img.shields.io/david/thinkjs/lightkeeper.svg?style=flat-square)]()

pharos data send script for web. Support UMD, AMD, CommonJS in Browser.

## Installation

```sh
npm install lightkeeper --save-dev
```

## How To Use

### UMD

You can use with `script` tag easily like:

```html
<script 
  src="https://unpkg.com/lightkeeper/dist/pharos.min.js"
  data-siteid="1"
  data-host="pharos.eming.li"  
></script>
<script type="text/javascript">
window.addEventListener('load', function() {
  pharos.monitor();
});
</script>
```

### Webpack

We also support commonjs require in webpack or rollup like:

```js
const Pharos = require('lightkeeper');
const site_id = 1;
const host = 'pharos.eming.li';

const pharos = new Pharos(site_id, host);
pharos.monitor();
```

## API

### pharos.add(key, val)

Allow develops add customized performance data. And the **val** must be a **Number**, otherwise, it will failed. And return **true** if added successfully. 

```js
pharos.add('render', 300);

pharos.add({
  render: 300,
  footer: 58
});
```
### pharos.delete(infoKeys)

Remove one or more keys from the performance data. And return **true** if deleted successfully.

```js
pharos.delete('render');

pharos.delete('loadPage', 'ttfb', 'lookupDomain');
```
### pharos.search(key)

Return the value of the specified parameter from the performance data.

```js
pharos.add('footer', 100);

pharos.search('footer');
//100
```

### pharos.time(name)

Work with pharos.timeEnd. To get a duration in milliseconds. pharos.time starts the time.

```js
pharos.time('fib_time');
fib(20);
pharos.timeEnd('fib_time');
//fib_time: 0.007080078125ms
pharos.search('fib_time');
//0.007080078125
```
### pharos.timeEnd(name)

pharos.timeEnd stops the timer and return the duration.

```js
pharos.time('fib_time');
fib(20);
pharos.timeEnd('fib_time');
//fib_time: 0.007080078125ms
pharos.search('fib_time');
//0.007080078125
```

## Contributing

Contributions welecome!

## License

[MIT](https://github.com/thinkjs/lightkeeper/blob/master/LICENSE)