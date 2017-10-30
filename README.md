# lightkeeper
pharos data send script for web. Support UMD, AMD, CommonJS in Browser.

## Installation

```sh
npm install @pharos/lightkeeper --save
```

## How To Use

### UMD

You can use with `script` tag easily like:

```html
<script 
  src="https://unpkg.com/@pharos/lightkeeper/dist/pharos.js"
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
const Pharos = require('@pharos/lightkeeper');
const site_id = 1;
const host = 'pharos.eming.li';

const pharos = new Pharos(site_id, host);
pharos.monitor();
```

## API

### pharos.add(key, val)

### pharos.time(name)

### pharos.timeEnd(name)

### pharos.delete(key, val)

### pharos.search(key)

## Contributing

Contributions welecome!

## License

[MIT](https://github.com/thinkjs/lightkeeper/blob/master/LICENSE)