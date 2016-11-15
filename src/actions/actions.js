import constants from '../constants/constants'

export default {

	organizationsReceived: (organizations) => {
		return {
			type: constants.ORGANIZATIONS_RECEIVED,
			organizations: organizations
		}
	},

	organizationCreated: (organization) => {
		return {
			type: constants.ORGANIZATION_CREATED,
			organization: organization
		}
	},



}