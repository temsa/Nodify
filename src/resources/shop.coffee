Base = require './base'

class Shop extends Base
	slug: "shop"
	prefix: "/shop"

	constructor: (site) ->
		super(site)

	get: (params, callback) =>
		[params, callback] = [callback, params = params or null ] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}", params
		@resource.get url, @slug, callback


module.exports = Shop
