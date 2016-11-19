import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import actions from '../actions/actions'
import { get } from '../../utils/Request'
import OrganizationListEl from './OrganizationListEl'


class Organizations extends Component {

	constructor(){
		super()
		this.state = {
			organization: {}
		}
	}

	componentDidMount(){

		get('/api/organization', this.props.location.query)
		.then((response) => {
			this.props.organizationsReceived(response.results)
		})
		.catch((e) => {
			console.error(e)
		})
	}

	// updateOrganization(event){
	// 	let updated = Object.assign({}, this.state.organization)
	// 	updated[event.target.id] = event.target.value
	// 	this.setState({
	// 		organization: updated
	// 	})
	// }
	//
	// createOrganization(event){
	//
	// 	post('/api/organization', this.state.organization)
	// 	.then((response) => {
	// 		this.props.organizationCreated(response.result)
	// 	})
	// 	.catch( (e) => { console.error(e); console.warn("that post err") })
	//
	// }

	render(){
		window.foos = OrganizationListEl
		window.debug_orgs = this.props.organizations
		const orgs = this.props.organizations.map(OrganizationListEl)

		return (
			<div className="container">
				<ol>{orgs}</ol>
				<Link to={'/add_org'}>Add Org Form</Link>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		organizations: state.organization.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
		organizationsReceived: (organizations) => dispatch(actions.organizationsReceived(organizations)),
		organizationCreated: (organization) => dispatch(actions.organizationCreated(organization))
	}
}

export default connect(stateToProps, dispatchToProps)(Organizations)
