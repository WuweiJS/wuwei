import React from 'react'
import Router, { RouteHandler, Route, DefaultRoute } from 'react-router'

import AppContainer from './AppContainer'
import CounterContainer from './counter/Container'
import PostalcodeContainer from './postalcode/Container'

Router.create({
  routes: (
    <Route path="/" handler={AppContainer}>
      <DefaultRoute name="counter" handler={CounterContainer} />
      <Route name="postalcode" handler={PostalcodeContainer} />
    </Route>
  ),
  location: Router.HashLocation
}).run(function (Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
