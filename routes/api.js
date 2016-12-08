var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

/*********************************************
Implemented routes in api.js:

GET  /<resource>       =>  controller.get
GET  /<resource>/<id>  =>  controller.getById
POST /<resource>       =>  controller.post
**********************************************/

router.get('/:resource', function(req, res, next) {

	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller == null){
	    res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
	    })

	    return
	}

	controller
	.get(req.query, false)
	.then(function(results){
	    res.json({
	    	confirmation: 'success',
	    	results: results
	    })
	})
	.catch(function(err){
	    res.json({
	    	confirmation: 'fail',
	    	message: err
	    })
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller = controllers[resource]

	if (controller == null){
	    res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
	    })

	    return
	}

	controller
	.getById(id)
	.then(function(result){
	    res.json({
	    	confirmation: 'success',
	    	result: result
	    })
	})
	.catch(function(err){
	    res.json({
	    	confirmation: 'fail',
	    	message: 'Not Found'
	    })
	})
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller == null){
	    res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
	    })

	    return
	}

	controller
	.post(req.body)
	.then(function(result){
	    res.json({
	    	confirmation: 'success',
	    	result: result
	    })
	})
	.catch(function(err){
	    res.json({
	    	confirmation: 'fail',
	    	message: err
	    })
	})
})

module.exports = router
