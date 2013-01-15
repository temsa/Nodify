class BaseChild
	parent: "/parent"
	slug: "base"
	child: "/base"
	resource: require '../resource'

	constructor: (site) ->
		@prefix = "#{site}#{@parent}"

	all: (parentId, params, callback) => 
		console.log arguments, 'parentId:', parentId
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number'
		if typeof parentId is 'function'
			[callback, params, parentId] = [parentId, undefined, '']
		else if typeof parentId is 'object'
			[callback, params, parentId] = [params, parentId, '']
		else if typeof params is 'function'
			[callback, params, parentId] = [params, undefined, parentId]

		url = @resource.queryString "#{@prefix}#{parentId}#{@child}", params
		@resource.get url, "#{@slug}s", callback

	count: (parentId, params, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string'
		if typeof parentId is 'function'
			[callback, params, parentId] = [parentId, undefined, '']
		else if typeof parentId is 'object'
			[callback, params, parentId] = [params, parentId, '']
		else if typeof params is 'function'
			[callback, params, parentId] = [params, undefined, parentId]

		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/count", params
		@resource.get url, "count", callback

	get: (parentId, id, params, callback) =>
		parentId = '/'+parentId if (typeof parentId is 'string' or typeof parentId is 'number' ) and (typeof id is 'string' or typeof id is 'number')
		if typeof id is 'function'
			[callback, params, id, parentId] = [id, undefined, parentId, '']
		else if typeof id is 'object'
			[callback, params, id, parentId] = [params, id, parentId,'']

		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}", params
		@resource.get url, @slug, callback

	create: (parentId, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof fields is 'function'
			[callback, fields, parentId] = [fields, parentId, '']
		#callback new Error 'Title is required' unless fields.title?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}"
		@resource.post url, @slug, fields, callback

	update: (parentId, id, fields, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof fields is 'function'
			[callback, fields, id, parentId] = [fields, id, parentId, '']
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}"
		@resource.put url, @slug, fields, callback

	delete: (parentId, id, callback) =>
		parentId = '/'+parentId if typeof parentId is 'string' or typeof parentId is 'number' 
		if typeof id is 'function'
			[callback, id, parentId] = [id, parentId, '']
		callback new Error 'missing' unless id?
		url = @resource.queryString "#{@prefix}#{parentId}#{@child}/#{id}"
		@resource.delete url, id, callback


module.exports = BaseChild