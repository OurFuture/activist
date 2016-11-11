var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	email: {type:String, trim:true, lowercase:true, default:''},
	username: {type:String, trim:true, default:''},
	password: {type:String, trim:true, default:''},
	modified: {type:Date, default:Date.now},
	timestamp: {type:Date, default:Date.now}
})

UserSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		username: this.username,
		password: this.password,
		modified: this.modified,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('UserSchema', UserSchema)