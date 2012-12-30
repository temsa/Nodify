BaseChild = require './base_child'

class Metafield extends BaseChild
	slug: "metafield"
	child: "/metafields"

	constructor: (@parent, site) ->
		super(site)

	create: (parentId, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, fields, callback] = ['', parentId, fields] if typeof callback is 'undefined'
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}"
		@resource.post url, @slug, fields, callback

module.exports = Metafield