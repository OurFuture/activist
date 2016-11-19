import React, { Component } from 'react'
import { get, post } from '../../utils/Request'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'

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

	updateOrganization(event){
		let updated = Object.assign({}, this.state.organization)
		updated[event.target.id] = event.target.value
		this.setState({
			organization: updated
		})
	}

	createOrganization(event){

		post('/api/organization', this.state.organization)
		.then((response) => {
			this.props.organizationCreated(response.result)
		})
		.catch( (e) => { console.error(e); console.warn("that post err") })

		// superagent
		// .post('/api/organization')
		// .send(this.state.organization)
		// .set('Accept', 'application/json')
		// .end((err, response) => {
		// 	if (err){
		// 		console.log(err)
		// 		return
		// 	}

//			store.currentStore().dispatch(actions.organizationCreated(response.body.result))
			// this.props.organizationCreated(response.body.result)
		// })


	}

	render(){
		const orgs = this.props.organizations.map((organization) => {
			return (
				<li key={organization.id}>
					<Link to={'/organization/'+organization.slug}>{organization.name}</Link>
					<div>{organization.address.street}</div>
					<div>{organization.address.state}, {organization.address.city}</div>
				</li>
			)
		})

		return (
			<div className="container">
				<ol>{orgs}</ol>
				This should be its own component:
				<div>
					<h2>Create Organization</h2>
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="name" name="name" placeholder="Name" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="description" name="description" placeholder="Description" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="email" name="email" placeholder="Email" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="phone" name="phone" placeholder="Phone" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="type" name="type" placeholder="Type" /><br />

			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="street" name="street" placeholder="Street" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="city" name="city" placeholder="City" /><br />
			    	<input onChange={this.updateOrganization.bind(this)} type="text" id="state" name="state" placeholder="State" /><br />

			    	<input onClick={this.createOrganization.bind(this)} className="btn btn-info" type="submit" value="create organization" />


				</div>
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
