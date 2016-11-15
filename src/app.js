import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Organizations from './components/Organizations'
import { Provider } from 'react-redux'
import store from './stores/store'

class App extends Component {
	render(){
		return (
			<Provider store={ store.configureStore() }>
				<div>
					This is the REACT app!
					<Organizations />
				</div>
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
