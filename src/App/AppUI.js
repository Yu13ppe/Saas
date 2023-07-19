import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
// import { NavBar } from '../Components/Navbar';
import routes from '../Config/routes';

function AppUI() {
  return (
    <React.Fragment>
      <Router>
          {/* <NavBar /> */}
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} component={route.component} />
            ))}
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export { AppUI }