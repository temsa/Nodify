debug = require('debug')('nodify')
debugRequest = require('debug')('nodify:request')
debugResponse = require('debug')('nodify:response')
debugToken = require('debug')('nodify:token')
request = require 'request'
querystring = require 'querystring'
singleton = require 'singleton'

class Resource extends singleton

  constructor: (@oauth = no, @onErr = ()->true ) ->  

  __request__: (url, slug, method, fields, callback) =>
    [fields, callback] = [callback, fields] if typeof fields is 'function'
    callback = (()->) if typeof callback isnt 'function'

    debug "sending a #{method} request to #{url}"

    headers = {}
    if @oauth is yes and @oauth_token? then headers['X-Shopify-Access-Token'] = @oauth_token

    if fields?
      params = {}
      if slug isnt 'oauth' 
        params[slug] = fields 
        body = JSON.stringify(params)
      else
        body = JSON.stringify(fields)

    if body?
      headers['Content-Length']= body.length

    options =
      uri: url
      method: method
      json: true
      headers: headers

    if body?
      options.body = body

    debugRequest "#{url} request body:", options.body
    debugToken "#{url} token is #{options.headers['X-Shopify-Access-Token']}"

    request options, (err, response, body) =>
      if err isnt null then callback err

      status = parseInt response.statusCode

      debug "received a #{status} response from #{url}"

      if status >= 300 then error = new Error "Status code #{status}" else error = null
      unless error?
        body = body[slug] if slug isnt 'oauth'
        body = slug if method is "DELETE"

        debugResponse "#{url} response", body || ''
        callback error, body
        
      else
        debugResponse "#{url} got a #{status} error", error, body || ''

        console.log body
        error.cause = body
        @onErr error, url
        callback error 
        

  get: (url, slug, callback) =>
    @__request__(url, slug, 'GET', callback)

  post: (url, slug, fields, callback) =>
    @__request__(url, slug, 'POST', fields, callback)

  put: (url, slug, fields, callback) =>
    @__request__(url, slug, 'PUT', fields, callback)

  delete: (url, slug, callback) =>
    @__request__(url, slug, 'DELETE', callback)

  queryString: (url, params, format = "json") =>
    query = "#{url}.#{format}"

    if params
      query += "?"
      query += querystring.stringify params

    return query


  setOAuthToken:(@oauth_token)=>
    @oauth = @oauth_token?

  error: (@onErr = ()->true ) =>


module.exports = Resource.get()



