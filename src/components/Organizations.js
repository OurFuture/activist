import React, { Component } from 'react'
import superagent from 'superagent'

class Organizations extends Component {

	constructor(){
		super()
		this.state = {
			list: []
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
			this.setState({
				list: response.body.results
			})
		})
	}

	render(){
		const orgs = this.state.list.map((organization, i) => {
			return (
				<li key={i}>{organization.name}</li>
			)
		})

		return (
			<div>
				<ol>{orgs}</ol>
			</div>
		)
	}
}

export default Organizations
