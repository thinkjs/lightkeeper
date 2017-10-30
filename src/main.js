const Pharos = require('./pharos');
const pharos = new Pharos();

global.addEventListener('load', function() {
  const script = document.querySelector('script[data-siteid][data-host]');
  pharos.site_id = script.getAttribute('data-siteid');
  pharos.host = script.getAttribute('data-host');
});

module.exports = pharos;
