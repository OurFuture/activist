import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Organizations from './components/Organizations'
import OrganizationDetail from './components/OrganizationDetail'
import { Provider } from 'react-redux'
import store from './stores/store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


const app = (
	<Provider store={ store.configureStore() }>
		<Router history={browserHistory}>
			<Route path="/" component={Organizations}></Route>
			<Route path="/organization/:slug" component={OrganizationDetail}></Route>
		</Router>
	</Provider>	
)

ReactDOM.render(app, document.getElementById('root'))
