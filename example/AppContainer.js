import React from 'react'
import { RouteHandler } from 'react-router'
import { Link } from 'react-router'

export default class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="counter">Counter</Link></li>
          <li><Link to="postalcode">Postal Code</Link></li>
        </ul>
        <hr />
        <RouteHandler />
      </div>
    )
  }
}
