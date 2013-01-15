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
      var url, _ref, _ref2, _ref3;
      console.log(arguments, 'parentId:', parentId);
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof parentId === 'function') {
        _ref = [parentId, void 0, ''], callback = _ref[0], params = _ref[1], parentId = _ref[2];
      } else if (typeof parentId === 'object') {
        _ref2 = [params, parentId, ''], callback = _ref2[0], params = _ref2[1], parentId = _ref2[2];
      } else if (typeof params === 'function') {
        _ref3 = [params, void 0, parentId], callback = _ref3[0], params = _ref3[1], parentId = _ref3[2];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child, params);
      return this.resource.get(url, "" + this.slug + "s", callback);
    };

    BaseChild.prototype.count = function(parentId, params, callback) {
      var url, _ref, _ref2, _ref3;
      if (typeof parentId === 'string') parentId = '/' + parentId;
      if (typeof parentId === 'function') {
        _ref = [parentId, void 0, ''], callback = _ref[0], params = _ref[1], parentId = _ref[2];
      } else if (typeof parentId === 'object') {
        _ref2 = [params, parentId, ''], callback = _ref2[0], params = _ref2[1], parentId = _ref2[2];
      } else if (typeof params === 'function') {
        _ref3 = [params, void 0, parentId], callback = _ref3[0], params = _ref3[1], parentId = _ref3[2];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/count", params);
      return this.resource.get(url, "count", callback);
    };

    BaseChild.prototype.get = function(parentId, id, params, callback) {
      var url, _ref, _ref2;
      if ((typeof parentId === 'string' || typeof parentId === 'number') && (typeof id === 'string' || typeof id === 'number')) {
        parentId = '/' + parentId;
      }
      if (typeof id === 'function') {
        _ref = [id, void 0, parentId, ''], callback = _ref[0], params = _ref[1], id = _ref[2], parentId = _ref[3];
      } else if (typeof id === 'object') {
        _ref2 = [params, id, parentId, ''], callback = _ref2[0], params = _ref2[1], id = _ref2[2], parentId = _ref2[3];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id, params);
      return this.resource.get(url, this.slug, callback);
    };

    BaseChild.prototype.create = function(parentId, fields, callback) {
      var url, _ref;
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof fields === 'function') {
        _ref = [fields, parentId, ''], callback = _ref[0], fields = _ref[1], parentId = _ref[2];
      }
      url = this.resource.queryString("" + this.prefix + parentId + this.child);
      return this.resource.post(url, this.slug, fields, callback);
    };

    BaseChild.prototype.update = function(parentId, id, fields, callback) {
      var url, _ref;
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof fields === 'function') {
        _ref = [fields, id, parentId, ''], callback = _ref[0], fields = _ref[1], id = _ref[2], parentId = _ref[3];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id);
      return this.resource.put(url, this.slug, fields, callback);
    };

    BaseChild.prototype["delete"] = function(parentId, id, callback) {
      var url, _ref;
      if (typeof parentId === 'string' || typeof parentId === 'number') {
        parentId = '/' + parentId;
      }
      if (typeof id === 'function') {
        _ref = [id, parentId, ''], callback = _ref[0], id = _ref[1], parentId = _ref[2];
      }
      if (id == null) callback(new Error('missing'));
      url = this.resource.queryString("" + this.prefix + parentId + this.child + "/" + id);
      return this.resource["delete"](url, id, callback);
    };

    return BaseChild;

  })();

  module.exports = BaseChild;

}).call(this);
