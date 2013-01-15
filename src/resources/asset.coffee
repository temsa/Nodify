BaseChild = require './base_child'

class Asset extends BaseChild
	slug: "asset"
	child: "/assets"

	constructor: (@parent, site) ->
		super(site)

	create: (parentId, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof fields is 'function'
			[callback, fields, parentId] = [fields, parentId, '']

		url = @resource.queryString "#{@prefix}#{parentId}#{@child}"
		@resource.put url, @slug, fields, callback

	update: @create

module.exports = Asset
