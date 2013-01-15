Session = require './session-oauth'
Resource = require './resource'

exports.createSession = (storename, apiKey, secret, params) ->
	new Session(storename, apiKey, secret, params)

#Global error manager
#onErr will be called on any error,
#and callback will be called if onErr returns true
exports.error = (onErr) ->
  Resource.error(onErr);