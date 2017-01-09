import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../actions/actions'
import { post } from '../../utils/Request'

// TODO: this should probably be passed in, not imported
import { browserHistory } from 'react-router'

class OrganizationForm extends Component {
  // TODO: this code is duplicated in Organizations, make DRY
  constructor(){
    super()
    this.state = {
      organization: {}
    }
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
      // Redirect to root on successful post
      // XXX: should this -always- go to root? Maybe browserHistory.push('___') should be a prop func
      // TODO: show "Created org" success flash after redirect
      browserHistory.push('/')
    })
    .catch( (e) => { alert("Error:" + e) })

  }

  render() {
    return (
      <div>
        <h1>Create Organization</h1>
        <h2>TODO: this quietly creates an org but does not redirect you</h2>
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
//
export default connect(stateToProps, dispatchToProps)(OrganizationForm)
