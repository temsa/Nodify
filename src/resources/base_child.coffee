class BaseChild
	parent: "/parent"
	slug: "base"
	child: "/base"
	resource: require '../resource'

	constructor: (site) ->
		@prefix = "#{site}#{@parent}"

	all: (parentId, params, callback) => 
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, params, callback] = ['', parentId, params] if typeof callback is 'undefined'
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}", params
		@resource.get url, "#{@slug}s", callback

	count: (parentId, params, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, params, callback] = ['', parentId, params] if typeof callback is 'undefined'
		[params, callback] = [callback, params] if typeof params is 'function'
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/count", params
		@resource.get url, "count", callback

	get: (parentId, id, params, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, params, callback] = ['', parentId, params] if typeof callback is 'undefined'
		[params, callback] = [callback, params] if typeof params is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}", params
		@resource.get url, @slug, callback

	create: (parentId, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, fields, callback] = ['', parentId, fields] if typeof callback is 'undefined'
		callback new Error 'Title is required' unless fields.title?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}"
		@resource.post url, @slug, fields, callback

	update: (parentId, id, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, id, fields, callback] = ['', parentId, id, fields] if typeof id is 'function'
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}"
		@resource.put url, @slug, fields, callback

	delete: (parentId, id, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		[parentId, id, callback] = ['', parentId, id] if typeof id is 'function'
		callback new Error 'missing' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}"
		@resource.delete url, id, callback


module.exports = BaseChild