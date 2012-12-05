(function() {
  var Base, Comment,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Comment = (function(_super) {

    __extends(Comment, _super);

    Comment.prototype.slug = "comment";

    Comment.prototype.prefix = "/comments";

    function Comment(site) {
      this["delete"] = __bind(this["delete"], this);
      this.remove = __bind(this.remove, this);
      this.approve = __bind(this.approve, this);
      this.notSpam = __bind(this.notSpam, this);
      this.spam = __bind(this.spam, this);      Comment.__super__.constructor.call(this, site);
    }

    Comment.prototype.spam = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/spam");
      return this.resource.post(url, this.slug, callback);
    };

    Comment.prototype.notSpam = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/not_spam");
      return this.resource.post(url, this.slug, callback);
    };

    Comment.prototype.approve = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/approve");
      return this.resource.post(url, this.slug, callback);
    };

    Comment.prototype.remove = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/remove");
      return this.resource.post(url, this.slug, callback);
    };

    Comment.prototype["delete"] = function(id, callback) {
      return this.remove(id, callback);
    };

    return Comment;

  })(Base);

  module.exports = Comment;

}).call(this);
