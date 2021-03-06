import React, { Component } from 'react'

import OrganizationListEl from './OrganizationListEl'

const OrganizationsList = props => {

  const org_els = props.organizations.map(org => {
  	return <OrganizationListEl key={org.id} {...org} />
  })

  return (
      <ul className={props.className}>
        {org_els}
      </ul>
  )
}

export default OrganizationsList
