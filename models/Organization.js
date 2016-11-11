var mongoose = require('mongoose')

var OrganizationSchema = new mongoose.Schema({
	name: {type:String, trim:true, default:''},
	slug: {type:String, trim:true, default:''},
	description: {type:String, trim:true, default:''},
	phone: {type:String, trim:true, default:''},
	email: {type:String, trim:true, default:''},
	type: {type:String, trim:true, default:''}, // Feminism, LGBTQ, Racial Justice, Environmental, Economic...
	geo:{
		type:[Number],
		index: '2d'
	},
	address: {type:mongoose.Schema.Types.Mixed, default:{}},
	social: {type:mongoose.Schema.Types.Mixed, default:{}},
	modified: {type:Date, default:Date.now},
	timestamp: {type:Date, default:Date.now},
	admins: {type:Array, default:[]}
})

OrganizationSchema.methods.summary = function(){
	var summary = {
		name: this.name,
		slug: this.slug,
		description: this.description,
		address: this.address,
		geo: this.geo,
		admins: this.admins,
		social: this.social,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('OrganizationSchema', OrganizationSchema)