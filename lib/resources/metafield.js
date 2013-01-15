(function() {
  var BaseChild, Metafield,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafield = (function(_super) {

    __extends(Metafield, _super);

    Metafield.prototype.slug = "metafield";

    Metafield.prototype.child = "/metafields";

    function Metafield(parent, site) {
      this.parent = parent;
      this.create = __bind(this.create, this);
      Metafield.__super__.constructor.call(this, site);
    }

    Metafield.prototype.create = function(parentId, fields, callback) {
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

    return Metafield;

  })(BaseChild);

  module.exports = Metafield;

}).call(this);
