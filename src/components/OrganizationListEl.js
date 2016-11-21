import React, { Component } from 'react'
import { Link } from 'react-router'

// A row in the list of organizations.

// const OrganizationListEl = organization => {
//   return (
//     <li>
//       <Link to={'/organization/'+organization.slug}>{organization.name}</Link>
//       <div>{organization.address.street}</div>
//       <div>{organization.address.state}, {organization.address.city}</div>
//     </li>
//   )
// }

export const OrganizationListEl = org => (
  <li>
    <time dateTime="2014-07-20 2000">
      <span className="day">20</span>
      <span className="month">Jan</span>
      <span className="year">2014</span>
      <span className="time">8:00 PM</span>
    </time>
    <img alt="{org.description}" src="https://farm5.staticflickr.com/4150/5045502202_1d867c8a41_q.jpg" />
    <div className="info">
      <Link to={"/organization/"+org.slug}>
        <h2 className="title">{org.name}</h2>
      </Link>
      <p className="desc">{org.description}</p>
      <ul>
        <li style={{width:"33%"}}>1 <span className="glyphicon glyphicon-ok"></span></li>
        <li style={{width: "34%"}}>3 <span className="fa fa-question"></span></li>
        <li style={{width:"33%"}}>103 <span className="fa fa-envelope"></span></li>
      </ul>
    </div>
    <div className="social">
      <ul>
        <li className="facebook" style={{width:"33%"}}><a href="#facebook"><span className="fa fa-facebook"></span></a></li>
        <li className="twitter" style={{width:"34%"}}><a href="#twitter"><span className="fa fa-twitter"></span></a></li>
        <li className="google-plus" style={{width:"33%"}}><a href="#google-plus"><span className="fa fa-google-plus"></span></a></li>
      </ul>
    </div>
  </li>
)

export default OrganizationListEl
