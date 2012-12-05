(function() {
  var Base, CustomerGroup,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  CustomerGroup = (function(_super) {

    __extends(CustomerGroup, _super);

    CustomerGroup.prototype.slug = "customer_group";

    CustomerGroup.prototype.prefix = "/customer_groups";

    function CustomerGroup(site) {
      this.customers = __bind(this.customers, this);      CustomerGroup.__super__.constructor.call(this, site);
    }

    CustomerGroup.prototype.customers = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/customers");
      return this.resource.post(url, "customers", callback);
    };

    return CustomerGroup;

  })(Base);

  module.exports = CustomerGroup;

}).call(this);
