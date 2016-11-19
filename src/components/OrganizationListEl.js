import React, { Component } from 'react'
import { Link } from 'react-router'

// A row in the list of organizations.
const OrganizationListEl = (organization) => {
  return (
    <li key={organization.id}>
      <Link to={'/organization/'+organization.slug}>{organization.name}</Link>
      <div>{organization.address.street}</div>
      <div>{organization.address.state}, {organization.address.city}</div>
    </li>
  )
}

export default OrganizationListEl
