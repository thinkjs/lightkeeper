exports.isNumber = function(arg) {
  return typeof arg === 'number';
};

exports.isEmpty = function(obj) {
  return obj === undefined || JSON.stringify(obj) === JSON.stringify({});
};

exports.build_query = function(obj) {
  const params = [];
  for (const k in obj) {
    let val = obj[k];
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    params.push(
      encodeURIComponent(k) + '=' + encodeURIComponent(val)
    );
  }
  return params.join('&');
};

exports.getPerformance = function() {
  const performance = global.performance;
  if (!performance) {
    // eslint-disable-next-line no-console
    console.log('Browser doesn\'t support Performance API');
  }
  return performance;
};

exports.sendLog = function(url) {
  if (!url) return;

  global.sadLog = new Image();
  global.sadLog.onload = global.sadLog.onerror = () => {
    delete global.sadLog;
  };
  global.sadLog.src = url;
};
