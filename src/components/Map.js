import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, Circle } from 'react-google-maps'
import { browserHistory } from 'react-router'

class Map extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			map: null
		}
	}

	mapDragged(){
		console.log("map dragged")
		var latLng = this.state.map.getCenter().toJSON()
		if (this.props.mapMoved != null)
			this.props.mapMoved(latLng)
	}

	handleMarkerClick(marker){
		console.log('MarkerClick: '+JSON.stringify(marker))
		console.log("Clicked id: " + marker.id)
		browserHistory.push('/organization/'+marker.slug) // force redirect to org page

	}

	render(){
		var markers = null
		if (this.props.organizations != null){
			markers = this.props.organizations.map(org => {
				org.defaultAnimation = this.props.animation
				// org['icon'] = org.image+'=s60-c' //TODO: org/event icons on map
				org.position = {
					lat: org.geo[0],
					lng: org.geo[1]
				},
				org.opacity = (this.props.active_org === org.id) ? 1.0 : 0.75 //TODO: up opacity when selected

		        return (
		            <Marker
		            	key={org.id}
		            	clickable={true}
		            	// icon={org.icon}
		            	label={org.name} // displayed as text over the icon
		            	title={org.name} //???
		            	onClick={this.handleMarkerClick.bind(this, org)}
		            	{...org} />
		        )
			})
		} else {
			console.warn("Map found no organizations!")
		}

		const mapContainer = <div id={this.props.id} className={this.props.className}></div>
		return (
		    <GoogleMapLoader
		        containerElement = { mapContainer }
		        googleMapElement = {
			        <GoogleMap
			            ref={ (map) => {
				            	if (this.state.map != null)
				            		return

			            		this.setState({map: map})
			             	}
			         	}

			            onDragend={this.mapDragged.bind(this)}
			            defaultZoom={this.props.zoom}
			            defaultCenter={this.props.center}
			            options={{streetViewControl: false, mapTypeControl: false}}>
			            { markers }
			        </GoogleMap>
		    	} />
		)
	}
}


export default Map

//     var _this = this //TODO: HACK! Use bind.
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         }
