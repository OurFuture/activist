import constants from '../constants/constants'

var initialState = {
	map: {},
	list: []
}

export default (state = initialState, action) => {
	var newState = Object.assign({}, state)

	switch (action.type) {
		case constants.ORGANIZATIONS_RECEIVED:
//			console.log('ORGANIZATIONS_RECEIVED:')

			// set up list
			newState['list'] = action.organizations
			// reference by slug
			action.organizations.forEach(org => {
				newState['map'][org.slug] = org
			})
			return newState

		case constants.ORGANIZATION_CREATED:
//			console.log('ORGANIZATION_CREATED:')

			// do stuff

			let updatedList = Object.assign([], newState.list)
			updatedList.push(action.organization)
			newState['list'] = updatedList
			return newState

		default:
			return state
	}

}
