import React, { Component } from 'react'
import superagent from 'superagent'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class Organizations extends Component {

	constructor(){
		super()
		this.state = {
			organization: {

			}
		}
	}

	componentDidMount(){
		superagent
		.get('/api/organization')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err){
				console.log(err)
				return
			}

			console.log(JSON.stringify(response.body))
			this.props.organizationsReceived(response.body.results)
		})
	}

	updateOrganization(event){
		console.log('updateOrganization: '+event.target.id + '==' + event.target.value)
		let updated = Object.assign({}, this.state.organization)
		updated[event.target.id] = event.target.value
		this.setState({
			organization: updated
		})
	}

	createOrganization(event){
//		console.log('createOrganization: '+JSON.stringify(this.state.organization))

		superagent
		.post('/api/organization')
		.send(this.state.organization)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err){
				console.log(err)
				return
			}

			console.log(JSON.stringify(response.body))
//			store.currentStore().dispatch(actions.organizationCreated(response.body.result))
			this.props.organizationCreated(response.body.result)
		})


	}

	render(){
		const orgs = this.props.organizations.map((organization, i) => {
			return (
				<li key={i}>{organization.name}</li>
			)
		})

		return (
			<div className="container">
				<ol>{orgs}</ol>
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
