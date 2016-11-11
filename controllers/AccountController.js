var User = require('../models/User')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

module.exports = {
	login: function(params, completion){
		User.find({username:params.username}, function(err, users) {
			if (err) {
				completion({message:err.message}, null)
				return
			}
			
			if (users.length == 0){
				completion({message:'User '+params.username+' not found.'}, null)
				return
			}
			
			var user = users[0] // assume first one
			var isPasswordCorrect = bcrypt.compareSync(params.password, user.password)
			
			if (isPasswordCorrect == false){
				completion({message:'Incorrect Password'}, null)
				return
			}

			// if (profile.password != params.password){
			// 	completion({'message':'Incorrect Password'}, null)
			// 	return
			// }
				
			completion(null, user.summary())
			return
		})
	},

	checkCurrentUser: function(req){
		return new Promise(function(resolve, reject){
			if (req.session == null){
				resolve(null)
				return
			}

			if (req.session.user == null){
				resolve(null)
				return
			}

			var userId = req.session.user
			User.findById(userId, function(err, user){
				if (err){
					req.session.reset()
					resolve(null)
					return
				}
				
				if (user == null){
					req.session.reset()
					resolve(null)
					return
				}

				resolve(user.summary())
			})
		})
	}, 

	currentUser: function(req){
	    return new Promise(function (resolve, reject){
			if (req.session == null){
				resolve(null)
				return
			}

			if (req.session.user == null){
				resolve(null)
				return
			}

			var userId = req.session.user
			User.findById(userId, function(err, user){
				if (err){
					resolve(null)
					return
				}
				
				if (user == null){
					resolve(null)
					return
				}

				resolve(user.summary())
			})
	    })
	}

}

