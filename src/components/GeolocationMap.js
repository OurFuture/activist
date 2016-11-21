import React, { Component } from 'react'
import { connect } from 'react-redux'

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  console.log(browserHasGeolocation ? "got geo: " + pos : "no geo")
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

class GeolocationMap extends Component {
  constructor(props){
    super()

    if (!props.google) {
      console.error("No google object in props!")
    }

    this.state = {
      map: {},
      infoWindow: {},
      google: props.google,
      markers: []
    }
  }

  componentDidMount() {
    this.state.map = new this.state.google.maps.Map(document.getElementById(this.props.id), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 14
    })
    this.state.infoWindow = new this.state.google.maps.InfoWindow({
      map: this.state.map
    })

    var _this = this //TODO: HACK! Use bind.
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        // "You are here" info
        _this.state.infoWindow.setPosition(pos);
        _this.state.infoWindow.setContent('You are here.');
        // actually move the map
        _this.state.map.setCenter(pos);
      }, function() {
        handleLocationError(true, _this.state.infoWindow, _this.state.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, _this.state.infoWindow, _this.state.map.getCenter());
    }

    // example of adding a marker
    this.state.markers.push(new this.state.google.maps.Marker({
      position: {lat:40.747154, lng:-73.948426},
      title: "Test marker",
      map: this.state.map
    }))
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}></div>
    )
  }

}

export default GeolocationMap
