var mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:''},
	slug: {type:String, trim:true, default:''},
	hosts: {type:Array, default:[]},
	description: {type:String, trim:true, default:''},
	geo:{
		type:[Number],
		index: '2d'
	},
	address: {type:mongoose.Schema.Types.Mixed, default:{}},
	modified: {type:Date, default:Date.now},
	timestamp: {type:Date, default:Date.now}
})

EventSchema.methods.summary = function(){
	var summary = {
		title: this.title,
		slug: this.slug,
		description: this.description,
		address: this.address,
		geo: this.geo,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('EventSchema', EventSchema)