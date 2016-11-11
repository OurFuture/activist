import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Organizations from './components/Organizations'

class App extends Component {
	render(){
		return (
			<div>
				This is the REACT app!
				<Organizations />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
