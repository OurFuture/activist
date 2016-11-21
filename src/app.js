import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

import Organizations from './components/Organizations'
import OrganizationDetail from './components/OrganizationDetail'
import OrganizationListEl from './components/OrganizationListEl'
import OrganizationForm from './components/OrganizationForm'
import GeolocationMap from './components/GeolocationMap'

import Nav from './components/Nav'

import store from './stores/store'

class MainPage extends Component {
	render(){ return(
		<div>
			<Nav />
			<div className="container-fluid">

				<GeolocationMap
					id="map"
					className="col-sm-6"
					google={window.google}
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
