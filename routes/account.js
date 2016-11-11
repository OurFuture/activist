var express = require('express')
var router = express.Router()
var UserController = require('../controllers/UserController')
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next){
	var action = req.params.action

	if (action == 'logout'){
		req.session.reset()
		res.json({
			confirmation: 'success'
		})
	}

	if (action == 'currentuser'){ // check if user logged in
		if (req.session == null){
			res.json({
				confirmation: 'fail',
				message: 'User not logged in'
			})

			return
		}

		if (req.session.user == null){
			res.json({
				confirmation: 'fail',
				message: 'User not logged in'
			})

			return
		}

		var userId = req.session.user
		UserController
		.getById(userId)
		.then(function(user){
			res.json({
				confirmation: 'success',
				user: user
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})
	}
})

router.post('/:action', function(req, res, next){
	var action = req.params.action

	if (action == 'register'){
		UserController
		.post(req.body)
		.then(function(user){
			req.session.user = user.id
			res.json({
				confirmation: 'success',
				user: user
			})
		})
		.catch(function(err){
			res.json({
				confirmation:'fail',
				message: err
			})

			return
		})
	}


	if (action == 'login'){
		var username = req.body.username
		UserController
		.get({username:username}, true)
		.then(function(users){
			if (users.length == 0){
				res.json({
					confirmation:'fail',
					message:'Profile not found. Check spelling.'
				})

				return
			}

			var user = users[0]
			var password = req.body.password

			// Check password
			var passwordCorrect = bcrypt.compareSync(password, user.password)
			if (passwordCorrect == false){
				res.json({
					confirmation:'fail',
					message:'Incorrect Password'
				})

				return				
			}

			req.session.user = user._id
			res.json({
				confirmation: 'success',
				user: user.summary()
			})
		})
		.catch(function(err){
			res.json({
				confirmation:'fail',
				message: err
			})

			return
		})
	}

})

module.exports = router