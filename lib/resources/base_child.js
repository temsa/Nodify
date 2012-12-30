(function() {
  var BaseChild,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BaseChild = (function() {

    BaseChild.prototype.parent = "/parent";

    BaseChild.prototype.slug = "base";

    BaseChild.prototype.child = "/base";

    BaseChild.prototype.resource = require('../resource');

    function BaseChild(site) {
      this["delete"] = __bind(this["delete"], this);
      this.update = __bind(this.update, this);
      this.create = __bind(this.create, this);
      this.get = __bind(this.get, this);
      this.count = __bind(this.count, this);
      this.all = __bind(this.all, this);      this.prefix = "" + site + this.parent;
    }

    BaseChild.prototype.all = function(parentId, params, callback) {
      var url, _ref, _ref2;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof callback === 'undefined') {
        _ref = ['', parentId, params], parentId = _ref[0], params = _ref[1], callback = _ref[2];
      }
      if (typeof params === 'function') {
        _ref2 = [callback, params], params = _ref2[0], callback = _ref2[1];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child, params);
      return this.resource.get(url, "" + this.slug + "s", callback);
    };

    BaseChild.prototype.count = function(parentId, params, callback) {
      var url, _ref, _ref2;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof callback === 'undefined') {
        _ref = ['', parentId, params], parentId = _ref[0], params = _ref[1], callback = _ref[2];
      }
      if (typeof params === 'function') {
        _ref2 = [callback, params], params = _ref2[0], callback = _ref2[1];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/count", params);
      return this.resource.get(url, "count", callback);
    };

    BaseChild.prototype.get = function(parentId, id, params, callback) {
      var url, _ref, _ref2;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof callback === 'undefined') {
        _ref = ['', parentId, params], parentId = _ref[0], params = _ref[1], callback = _ref[2];
      }
      if (typeof params === 'function') {
        _ref2 = [callback, params], params = _ref2[0], callback = _ref2[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id, params);
      return this.resource.get(url, this.slug, callback);
    };

    BaseChild.prototype.create = function(parentId, fields, callback) {
      var url, _ref;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof callback === 'undefined') {
        _ref = ['', parentId, fields], parentId = _ref[0], fields = _ref[1], callback = _ref[2];
      }
      if (fields.title == null) callback(new Error('Title is required'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child);
      return this.resource.post(url, this.slug, fields, callback);
    };

    BaseChild.prototype.update = function(parentId, id, fields, callback) {
      var url, _ref;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof id === 'function') {
        _ref = ['', parentId, id, fields], parentId = _ref[0], id = _ref[1], fields = _ref[2], callback = _ref[3];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id);
      return this.resource.put(url, this.slug, fields, callback);
    };

    BaseChild.prototype["delete"] = function(parentId, id, callback) {
      var url, _ref;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof id === 'function') {
        _ref = ['', parentId, id], parentId = _ref[0], id = _ref[1], callback = _ref[2];
      }
      if (id == null) callback(new Error('missing'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id);
      return this.resource["delete"](url, id, callback);
    };

    return BaseChild;

  })();

  module.exports = BaseChild;

}).call(this);
