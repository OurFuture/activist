import React, { Component } from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class OrganizationDetail extends Component {
	constructor(){
		super()
		this.state = {
			organization: {}
		}
	}

	render(){
		// find the first matching slug in the state
		const slug = this.props.params.slug
		const org = this.props.organizations.list.find((organization) => {return organization.slug == slug})
		if (org == undefined) {
			return <h1>Unhandled error: Bad link, or org with given slug not in state...</h1>
		}
		return (
			<div>
				<h1>Is this OrganizationDetail code a terrible hack?</h1>
				<h1>{org.name}</h1>
				<div>
					<strong>Description</strong>
					<p>{org.description}</p>
				</div>
				<div>
					<strong>Address</strong>
					<p>{org.address.street}</p>
					<p>{org.address.state}, {org.address.city}</p>
				</div>
				<small>All the deets: {JSON.stringify(org)}</small>
			</div>

		)

	}
}

const stateToProps = (state) => {
	return {
		organizations: state.organization
	}
}

export default connect(stateToProps)(OrganizationDetail)
