(function() {
  var Resource, querystring, request, singleton,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  request = require('request');

  querystring = require('querystring');

  singleton = require('singleton');

  Resource = (function(_super) {

    __extends(Resource, _super);

    function Resource(oauth) {
      this.oauth = oauth != null ? oauth : false;
      this.setOAuthToken = __bind(this.setOAuthToken, this);
      this.queryString = __bind(this.queryString, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.post = __bind(this.post, this);
      this.get = __bind(this.get, this);
      this.__request__ = __bind(this.__request__, this);
    }

    Resource.prototype.__request__ = function(url, slug, method, fields, callback) {
      var options, params, _ref;
      if (typeof fields === 'function') {
        _ref = [callback, fields], fields = _ref[0], callback = _ref[1];
      }
      options = {
        uri: url,
        method: method,
        json: slug !== 'oauth',
        headers: this.oauth === true && (this.oauth_token != null) ? {
          'X-Shopify-Access-Token': this.oauth_token
        } : {}
      };
      if (fields != null) {
        params = {};
        if (slug !== 'oauth') {
          params[slug] = fields;
          options.body = JSON.stringify(params);
        } else {
          options.body = fields;
        }
      }
      return request(options, function(err, response, body) {
        var status;
        status = parseInt(response.statusCode);
        if (status >= 300) {
          err = new Error("Status code " + status);
        } else {
          err = null;
        }
        if (err == null) {
          return process.nextTick(function() {
            if (slug !== 'oauth') body = body[slug];
            if (method === "DELETE") body = slug;
            return callback(err, body);
          });
        } else {
          return process.nextTick(function() {
            console.log(body);
            return callback(err);
          });
        }
      });
    };

    Resource.prototype.get = function(url, slug, callback) {
      return this.__request__(url, slug, 'GET', callback);
    };

    Resource.prototype.post = function(url, slug, fields, callback) {
      return this.__request__(url, slug, 'POST', fields, callback);
    };

    Resource.prototype.put = function(url, slug, fields, callback) {
      return this.__request__(url, slug, 'PUT', fields, callback);
    };

    Resource.prototype["delete"] = function(url, slug, callback) {
      return this.__request__(url, slug, 'DELETE', callback);
    };

    Resource.prototype.queryString = function(url, params, format) {
      var query;
      if (format == null) format = "json";
      query = "" + url + "." + format;
      if (params) {
        query += "?";
        query += querystring.stringify(params);
      }
      return query;
    };

    Resource.prototype.setOAuthToken = function(oauth_token) {
      this.oauth_token = oauth_token;
      return this.oauth = this.oauth_token != null;
    };

    return Resource;

  })(singleton);

  module.exports = Resource.get();

}).call(this);
