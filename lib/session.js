(function() {
  var ApplicationCharge, Article, Asset, Blog, Cart, Collect, Comment, Country, CustomCollection, Customer, CustomerGroup, Event, Fullfilment, Metafield, Order, Page, Product, ProductImage, ProductSearchEngine, ProductVariant, Province, RecurringApplicationCharge, Redirect, ScriptTags, Session, Shop, SmartCollection, Theme, Transaction, Webhook, crypto, empty, isNumeric, sortObj, trim;

  crypto = require('crypto');

  ApplicationCharge = require('./resources/application_charge');

  Article = require('./resources/article');

  Asset = require('./resources/asset');

  Blog = require('./resources/blog');

  Cart = require('./resources/cart');

  Collect = require('./resources/collect');

  Comment = require('./resources/comment');

  Country = require('./resources/country');

  CustomCollection = require('./resources/custom_collection');

  Customer = require('./resources/customer');

  CustomerGroup = require('./resources/customer_group');

  Event = require('./resources/event');

  Fullfilment = require('./resources/fullfilment');

  Metafield = require('./resources/metafield');

  Order = require('./resources/order');

  Page = require('./resources/page');

  Product = require('./resources/product');

  ProductImage = require('./resources/product_image');

  ProductSearchEngine = require('./resources/product_search_engine');

  ProductVariant = require('./resources/product_variant');

  Province = require('./resources/province');

  RecurringApplicationCharge = require('./resources/recurring_application_charge');

  Redirect = require('./resources/redirect');

  ScriptTags = require('./resources/script_tags');

  Shop = require('./resources/shop');

  SmartCollection = require('./resources/smart_collection');

  Theme = require('./resources/theme');

  Transaction = require('./resources/transaction');

  Webhook = require('./resources/webhook');

  trim = function(string) {
    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  empty = function(string) {
    string = trim(string);
    return string.length === 0;
  };

  sortObj = function(o) {
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

  isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  Session = (function() {

    Session.prototype.protocol = "https";

    function Session(url, apiKey, secret, params) {
      var expireTime, timestamp;
      this.url = url;
      this.apiKey = apiKey;
      this.secret = secret;
      this.params = params != null ? params : {};
      if (this.params['signature'] != null) {
        timestamp = (new Date(this.params['timestamp'])).getTime();
        expireTime = (new Date).getTime() - (24 * 84600);
        if (!this.validateSignature(this.params) && expireTime > timestamp) {
          throw new Error('Invalid signature: Possible malicious login.');
        }
      }
      this.url = this.prepareUrl(this.url);
      if (this.valid) {
        this.applicationCharge = new ApplicationCharge(this.site());
        this.article = new Article(this.site());
        this.asset = new Asset(this.site());
        this.blog = new Blog(this.site());
        this.blogMetafield = new Metafield('/blogs', this.site());
        this.cart = new Cart(this.site());
        this.collect = new Collect(this.site());
        this.comment = new Comment(this.site());
        this.country = new Country(this.site());
        this.customCollection = new CustomCollection(this.site());
        this.customCollectionMetafield = new Metafield('/custom_collections', this.site());
        this.customer = new Customer(this.site());
        this.customerMetafield = new Metafield('/customers', this.site());
        this.customerGroup = new CustomerGroup(this.site());
        this.event = new Event(this.site());
        this.fullfilment = new Fullfilment(this.site());
        this.metafield = new Metafield('', this.site());
        this.order = new Order(this.site());
        this.orderMetafield = new Metafield('/orders', this.site());
        this.page = new Page(this.site());
        this.pageMetafield = new Metafield('/pages', this.site());
        this.product = new Product(this.site());
        this.productImage = new ProductImage(this.site());
        this.productMetafield = new Metafield('/products', this.site());
        this.productVariant = new ProductVariant(this.site());
        this.productSearchEngine = new ProductSearchEngine(this.site());
        this.province = new Province(this.site());
        this.recurringApplicationCharge = new RecurringApplicationCharge(this.site());
        this.redirect = new Redirect(this.site());
        this.scriptTags = new ScriptTags(this.site());
        this.shop = new Shop(this.site());
        this.smartCollection = new SmartCollection(this.site());
        this.smartCollectionMetafield = new Metafield('/smart_collections', this.site());
        this.theme = new Theme(this.site());
        this.transaction = new Transaction(this.site());
        this.webhook = new Webhook(this.site());
      }
    }

    Session.prototype.createPermissionUrl = function() {
      if (!empty(this.url) && !empty(this.apiKey)) {
        return "http://" + this.url + "/admin/api/auth?api_key=" + this.apiKey;
      }
    };

    Session.prototype.site = function() {
      return "" + this.protocol + "://" + this.apiKey + ":" + (this.computedPassword()) + "@" + this.url + "/admin";
    };

    Session.prototype.valid = function() {
      return !empty(this.url);
    };

    Session.prototype.prepareUrl = function(url) {
      if (empty(url)) return '';
      url.replace(/https?:\/\//, '');
      if (url.indexOf(".") === -1) url += '.myshopify.com';
      return url;
    };

    Session.prototype.validateSignature = function(params) {
      var generatedSignature, k, v;
      this.signature = params['signature'];
      generatedSignature = this.secret;
      params = sortObj(params);
      for (k in params) {
        v = params[k];
        if (k !== "signature" && k !== "action" && k !== "controller" && !isNumeric(k) && (k != null)) {
          generatedSignature += "" + k + "=" + v;
        }
      }
      generatedSignature = generatedSignature.replace(new RegExp("undefined=undefined"), '');
      generatedSignature = crypto.createHash('md5').update("" + generatedSignature).digest("hex");
      return generatedSignature === this.signature;
    };

    return Session;

  })();

  module.exports = Session;

}).call(this);
