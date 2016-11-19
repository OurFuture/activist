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
		const slug = this.props.params.slug
		const org = this.props.organizations.list.find((organization) => {return organization.slug == slug})
		return (
			<div>
				<h1>Is this code a terrible hack?</h1>
				<p>OrganizationDetail page for org: {org.name} </p>
				<p>All the deets: {JSON.stringify(org)}</p>
			</div>

		)

	}
}

const stateToProps = (state) => {
	console.log('woo', state.organization)
	return {
		organizations: state.organization
	}
}

export default connect(stateToProps)(OrganizationDetail)
