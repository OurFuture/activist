var Promise = require('bluebird')

module.exports = {

	sendEmail: function(from, recipient, subject, text){
		return new Promise(function (resolve, reject){
			var helper = require('sendgrid').mail
			var from_email = new helper.Email(from)
			var to_email = new helper.Email(recipient)
			var content = new helper.Content('text/plain', text)
			var mail = new helper.Mail(from_email, subject, to_email, content)

			var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
			var request = sg.emptyRequest({
			  method: 'POST',
			  path: '/v3/mail/send',
			  body: mail.toJSON(),
			})

			sg.API(request, function(error, response) {
			  console.log(response.statusCode)
			  console.log(response.body)
			  console.log(response.headers)
			  if (error) { reject(error) }
			  else { resolve() }
			})
		})
	},

	sendEmails: function(from, recipients, subject, text){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
			for (var i=0; i<recipients.length; i++){
				var recipient = recipients[i]
				if (recipient.indexOf('@') == -1) // invalid
					continue

				sendgrid.send({
					to:       recipient,
					from:     from,
					fromname: 'Perc',
					subject:  subject,
					text:     text
				}, function(err) {
					// if (err) {reject(err) }
					// else { resolve() }
				})
			}

			resolve()
		})
	},	

	sendHtmlEmail: function(from, recipient, subject, html){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)
			sendgrid.send({
				to:       recipient,
				from:     from,
				fromname: 'Perc',
				subject:  subject,
				html:     html
			}, function(err) {
				if (err) {reject(err) }
				else { resolve() }
			})
		})
	}



}