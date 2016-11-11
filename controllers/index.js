var OrganizationController = require('../controllers/OrganizationController')
var EventController = require('../controllers/EventController')
var UserController = require('../controllers/UserController')

module.exports = {
	organization: OrganizationController,
	event: EventController,
	user: UserController
}