module.exports = {

	convertToJson: function(records){
		// Calls the summary() method of each record
		// TODO: replace the code below with this map:
		// return records.map(function (r) { return r.summary()})
		var results = new Array()
	    for (var i=0; i<records.length; i++){
	  	  var p = records[i]
	  	  results.push(p.summary())
	    }

		return results
	}


}
