var User = require('../models/User')
var Request = require('../utils/Request')
var Resource = require('../utils/Resource')
var TextUtils = require('../utils/TextUtils')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			var sortOrder = (params.sort == 'asc') ? 1 : -1
			delete params['sort']

			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = '0'
			
			delete params['limit']
			User.find(params, null, {limit:parseInt(limit), sort:{timestamp: sortOrder}}, function(err, users){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true){
					resolve(users)
					return
				}

				resolve(Resource.convertToJson(users))
			})
		})
	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			User.findById(id, function(err, user){
				if (err){
					reject(err)
					return
				}

				if (user == null){
					reject({
						message: 'Not Found'
					})
					return
				}

				resolve(user.summary())
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			params['password'] = bcrypt.hashSync(params.password, 10)

			User.create(params, function(err, user){
				if (err){
					reject(err)
					return
				}

				resolve(user.summary())
			})
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			params['modified'] = Date.now
			User.findByIdAndUpdate(id, params, {new:true}, function(err, user){
				if (err){
					reject(err)
					return
				}

				resolve(user.summary())
			})
		})
	},

	delete: function(id){
		return new Promise(function(resolve, reject){
			User.findByIdAndRemove(id, function (err){
			    if (err) { 
					reject(err)
					return
			    }

			    resolve()
			})
		})
	}
}

