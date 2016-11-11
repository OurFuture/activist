var superagent = require('superagent')
var Promise = require('bluebird')

module.exports = {

	get: function(url, params){

	    return new Promise(function (resolve, reject){

	        superagent
	            .get(url)
	            .query(params)
	            .set('Accept', 'application/json')
	            .end(function(err, res){
	                if (err){ reject(err) }
	                else { resolve(res.body) }
	            })
	    })
	}

}