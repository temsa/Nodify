(function() {
  var Resource, Session;

  Session = require('./session-oauth');

  Resource = require('./resource');

  exports.createSession = function(storename, apiKey, secret, params) {
    return new Session(storename, apiKey, secret, params);
  };

  exports.error = function(onErr) {
    return Resource.error(onErr);
  };

}).call(this);
