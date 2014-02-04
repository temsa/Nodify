crypto = require 'crypto'
ApplicationCharge = require './resources/application_charge'
Article = require './resources/article'
Asset = require './resources/asset' 
Blog = require './resources/blog'
Cart = require './resources/cart'
Collect = require './resources/collect'
Comment = require './resources/comment'
Country = require './resources/country'
CustomCollection = require './resources/custom_collection'
Customer = require './resources/customer'
CustomerGroup = require './resources/customer_group'
Event = require './resources/event'
Fullfilment = require './resources/fullfilment'
Metafield = require './resources/metafield'
Order = require './resources/order'
Page = require './resources/page'
Product = require './resources/product'
ProductImage = require './resources/product_image'
ProductSearchEngine = require './resources/product_search_engine'
ProductVariant = require './resources/product_variant'
Province = require './resources/province'
RecurringApplicationCharge = require './resources/recurring_application_charge'
Redirect = require './resources/redirect'
ScriptTags = require './resources/script_tags'
Shop = require './resources/shop'
SmartCollection = require './resources/smart_collection'
Theme = require './resources/theme'
Transaction = require './resources/transaction'
Webhook = require './resources/webhook'

utils =  require './utils'

trim = utils.trim
empty = utils.empty
sortObj = utils.sortObj
isNumeric = utils.isNumeric


class Session

  protocol: "https"


  constructor: (@url, @apiKey, @secret, @params = {}) ->
    if @params['error']?
      @error @params['error']

    if @params['signature']?
      timestamp = (new Date(@params['timestamp'])).getTime()
      expireTime = (new Date).getTime() - (24 * 84600)
      if not @validateSignature(@params) and expireTime > timestamp
        throw new Error 'Invalid signature: Possible malicious login.'
      
    @url = @prepareUrl(@url)

    if @valid
      @applicationCharge = new ApplicationCharge(@site())
      @article = new Article(@site())
      @asset = new Asset('/themes', @site())
      @blog = new Blog(@site())
      @blogMetafield = new Metafield('/blogs', @site())
      @cart = new Cart(@site())
      @collect = new Collect(@site())
      @comment = new Comment(@site())
      @country = new Country(@site())
      @customCollection = new CustomCollection(@site())
      @customCollectionMetafield = new Metafield('/custom_collections', @site())
      @customer = new Customer(@site())
      @customerMetafield = new Metafield('/customers', @site())
      @customerGroup = new CustomerGroup(@site())
      @event = new Event(@site())
      @fullfilment = new Fullfilment(@site())
      @metafield = new Metafield('', @site())
      @order = new Order(@site())
      @orderMetafield = new Metafield('/orders', @site())
      @page = new Page(@site())
      @pageMetafield = new Metafield('/pages', @site())
      @product = new Product(@site())
      @productImage = new ProductImage(@site())
      @productMetafield = new Metafield('/products', @site())
      @productVariant = new ProductVariant(@site())
      @productVariantMetafield = new Metafield('/variants', @site())
      @productSearchEngine = new ProductSearchEngine(@site())
      @province = new Province(@site())
      @recurringApplicationCharge = new RecurringApplicationCharge(@site())
      @redirect = new Redirect(@site())
      @scriptTags = new ScriptTags(@site())
      @shop = new Shop(@site())
      @shopMetafield = @metafield
      @smartCollection = new SmartCollection(@site())
      @smartCollectionMetafield = new Metafield('/smart_collections', @site())
      @theme = new Theme(@site())
      @themeAsset = new Asset('/themes', @site())
      @transaction = new Transaction(@site())
      @webhook = new Webhook(@site())

  createPermissionUrl: ->
    "http://#{@url}/admin/api/auth?api_key=#{@apiKey}" if not empty(@url) and not empty(@apiKey)

  site: -> 
    "#{@protocol}://#{@apiKey}:#{@computedPassword()}@#{@url}/admin"

  valid: ->
    not empty(@url)


  prepareUrl: (url) ->
    return '' if empty(url)
    url.replace /https?:\/\//, ''
    url += '.myshopify.com' unless url.indexOf(".") isnt -1
    return url

  validateSignature: (params) ->
    @signature = params['signature']
    generatedSignature = @secret
    params = sortObj(params)
    for k, v of params
      if k isnt "signature" and k isnt "action" and k isnt "controller" and not isNumeric(k) and k?
        generatedSignature += "#{k}=#{v}"

    generatedSignature = generatedSignature.replace(new RegExp("undefined=undefined"), '')
    generatedSignature = crypto.createHash('md5').update("#{generatedSignature}").digest("hex")    
    generatedSignature is @signature

module.exports = Session
