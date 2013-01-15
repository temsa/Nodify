BaseChild = require './base_child'

class Metafield extends BaseChild
	slug: "metafield"
	child: "/metafields"

	constructor: (@parent, site) ->
		super(site)

	create: (parentId, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof fields is 'function'
			[callback, fields, parentId] = [fields, parentId, '']
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}"
		@resource.post url, @slug, fields, callback

module.exports = Metafield