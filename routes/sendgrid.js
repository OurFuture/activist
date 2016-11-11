var express = require('express')
var router = express.Router()
var EmailUtils = require('../utils/EmailUtils')

router.get('/:email', function(req, res, next){
	var email = req.params.email

//	sendEmail: function(from, recipient, subject, text){

	EmailUtils
	.sendEmail('ianlondondu@gmail.com', email, 'TEST', 'Hello from WEWORK!')
	.then(function(){
		res.json({
			confirmation:'success'
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err
		})
	})


})

module.exports = router