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

	delete: (parentId, key, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof key is 'function'
			[callback, key, parentId] = [id, parentId, '']
		callback new Error 'missing key' unless key?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}"
		fields={key:key}
		@resource.__request__(url, @slug, 'DELETE', fields, callback)

module.exports = Asset
