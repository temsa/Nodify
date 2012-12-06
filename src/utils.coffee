exports.trim = trim = (string) ->
  string.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

exports.empty = empty = (string)->
  string = trim(string)
  string.length is 0 

exports.sortObj = sortObj = (o) ->
  sorted = {}
  a = []

  for key of o 
    if o.hasOwnProperty key
      a.push key

  a.sort()

  for key in [0..a.length] 
    sorted[a[key]] = o[a[key]]
  
  return sorted

exports.isNumeric = isNumeric = (n) ->
  !isNaN(parseFloat(n)) and isFinite(n)