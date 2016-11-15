import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { organization } from '../reducers'

var store;

export default {

	configureStore: () => {
		const reducers = combineReducers({
			organization: organization
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store
	},


	currentStore: () => {
		return store
	}
}