var Event = require('../models/Event')
var Request = require('../utils/Request')
var Resource = require('../utils/Resource')
var TextUtils = require('../utils/TextUtils')
var Promise = require('bluebird')

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			var sortOrder = (params.sort == 'asc') ? 1 : -1
			delete params['sort']

			if (params.lat!=null && params.lng!=null){
				var distance = 1000/6371 // 6371 is radius of earth in KM
				params['geo'] = {
				  	$near: [params.lat, params.lng],
			  		$maxDistance: distance
				}

				delete params['lat']
				delete params['lng']
			}

			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = '0'
			
			delete params['limit']
			Event.find(params, null, {limit:parseInt(limit), sort:{timestamp: sortOrder}}, function(err, events){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true){
					resolve(events)
					return
				}

				resolve(Resource.convertToJson(events))
			})
		})
	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			Event.findById(id, function(err, event){
				if (err){
					reject(err)
					return
				}

				if (event == null){
					reject({
						message: 'Not Found'
					})
					return
				}

				resolve(event.summary())
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			params['slug'] = TextUtils.slugVersion(params.title)

			params['address'] = {
				street: params.street,
				city: params.city,
				state: params.state
			}

			var address = params.address
		    var url = 'https://maps.googleapis.com/maps/api/geocode/json'
		    var query = address.street+','+address.city+','+address.state
//		    console.log('QUERY: '+query)
		    var mapsQuery = {
		    	address: query,
		    	key:process.env.GOOGLE_MAPS_API_KEY
		    }

		    Request.get(url, mapsQuery)
		    .then(function(response){
//		    	console.log('GEOCODE: '+JSON.stringify(response))

		    	var results = response.results
		    	var locationInfo = results[0]
		    	var geometry = locationInfo.geometry
		    	var location = geometry.location
		    	var geo = [location.lat, location.lng]
		    	params['geo'] = geo

		    	var address_components = locationInfo['address_components'] // this is an array
		    	if (address_components != null){ // find zip code...

		    		var zip = ''
			    	for (var i=0; i<address_components.length; i++){
			    		var component = address_components[i]
			    		var types = component['types'] // this is an array
			    		if (types == null)
			    			continue

			    		var value = component['long_name']
			    		if (value == null)
			    			continue

			    		if (types.indexOf('postal_code') != -1)
					    	zip = value.toLowerCase()
			    	}

				    params['zip'] = zip
		    	}

				Event.create(params, function(err, event){
					if (err){
						reject(err)
						return
					}

					resolve(event.summary())
				})
		    })
		    .catch(function(err){
		    	console.log('ERROR: '+err)
		    	reject(err)
				return
		    })
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			params['modified'] = Date.now
			Event.findByIdAndUpdate(id, params, {new:true}, function(err, event){
				if (err){
					reject(err)
					return
				}

				resolve(event.summary())
			})
		})
	},

	delete: function(id){
		return new Promise(function(resolve, reject){
			Event.findByIdAndRemove(id, function (err){
			    if (err) { 
					reject(err)
					return
			    }

			    resolve()
			})
		})
	}
}

