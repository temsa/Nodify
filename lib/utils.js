(function() {
  var empty, isNumeric, sortObj, trim;

  exports.trim = trim = function(string) {
    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  exports.empty = empty = function(string) {
    string = trim(string);
    return string.length === 0;
  };

  exports.sortObj = sortObj = function(o) {
    var a, key, sorted, _ref;
    sorted = {};
    a = [];
    for (key in o) {
      if (o.hasOwnProperty(key)) a.push(key);
    }
    a.sort();
    for (key = 0, _ref = a.length; 0 <= _ref ? key <= _ref : key >= _ref; 0 <= _ref ? key++ : key--) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  };

  exports.isNumeric = isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

}).call(this);
