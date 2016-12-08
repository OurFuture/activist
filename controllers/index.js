var OrganizationController = require('../controllers/OrganizationController')
var EventController = require('../controllers/EventController')
var UserController = require('../controllers/UserController')

/* Most controllers implement the functions:
get(params, isRaw)
	isRaw:
		If false, just resolve the results of the query.
		If true, convert each object to its summary, via _.summary(), before resolving.
		TODO: explain: when is isRaw true?

getById(id)

post(params)

put(id, params)

delete(id)
*/

// The exported object maps from a resource name to its controller. It's used in routes.
module.exports = {
	organization: OrganizationController,
	event: EventController,
	user: UserController
}
