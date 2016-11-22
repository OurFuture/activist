import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

import {Organizations, OrganizationDetail,
	OrganizationListEl, OrganizationForm, Map, Nav } from './components/'

import store from './stores/store'

const default_center = {
	lat:40.735968,
	lng:-73.990483
}

const test_markers = [
	{ geo:[default_center.lat+0.005, default_center.lng-0.005] },
	{ geo:[default_center.lat-0.005, default_center.lng+0.005] }
]

window.test_markers = test_markers //DEBUG

class MainPage extends Component {
	render(){ return(
		<div>
			<Nav />
			<div className="container-fluid">

				<Map
					id="map"
					className="col-sm-6"
					markers={test_markers}
					zoom={14}
					center={default_center}
				/>

				<Organizations id="list-container" className="col-sm-6" />

				<Link to={'/add_org'}>Add Org Form</Link>

			</div>
		</div>
	)}}

const App = (
	<Provider store={ store.configureStore() }>
		<Router history={browserHistory}>

			<Route path="/" component={MainPage}></Route>

			<Route path="/add_org" component={OrganizationForm}></Route>

			<Route path="/organization/:slug" component={OrganizationDetail}></Route>
		</Router>
	</Provider>
)

ReactDOM.render(App, document.getElementById('root'))
