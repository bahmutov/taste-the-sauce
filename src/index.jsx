// Needed to add the below due to issues in IE11, see this thread
// https://github.com/facebook/create-react-app/issues/9906#issuecomment-720905753
/** @jsxRuntime classic */
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css'
import Login from './pages/Login'
import Inventory from './pages/Inventory'
import InventoryItem from './pages/InventoryItem'
import Cart from './pages/Cart'
import CheckOutStepOne from './pages/CheckOutStepOne'
import CheckOutStepTwo from './pages/CheckOutStepTwo'
import Finish from './pages/Finish'
import { ROUTES } from './utils/Constants'
import PrivateRoute from './components/PrivateRoute'

const routing = (
  <Router>
    <Route exact path={ROUTES.LOGIN} component={Login} />
    <PrivateRoute path={ROUTES.INVENTORY} component={Inventory} />
    <PrivateRoute path={ROUTES.INVENTORY_LIST} component={InventoryItem} />
    <PrivateRoute path={ROUTES.CART} component={Cart} />
    <PrivateRoute path={ROUTES.CHECKOUT_STEP_ONE} component={CheckOutStepOne} />
    <PrivateRoute path={ROUTES.CHECKOUT_STEP_TWO} component={CheckOutStepTwo} />
    <PrivateRoute path={ROUTES.CHECKOUT_COMPLETE} component={Finish} />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

/* istanbul ignore next */
if (window.Cypress) {
  // enable the popup in some situations
  // by varying the float limit. 1 means the popup always appears
  // 0 means the popup will never appear
  if (Math.random() < 1) {
    const delay = Cypress._.random(1000, 2000)
    setTimeout(() => {
      Cypress.$(document.body).append(
        Cypress.$(`
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center" id="modal">
          <div style="width: 200px; height: 300px; background-color: white; padding: 1rem">
            <div style="float: right; width: 28px; height: 28px; border: 1px solid black;
              font-size: 20px; font-weight: bold; text-align: center; line-height: 28px; autofocus"
              id="close-modal">X</div>
            <div style="display: flex; flex-direction: column; margin-top: 2rem">
              Modal with some promotion
            </div>
          </div>
        </div>
      `),
      )
      document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none'
      })
    }, delay)
  }
}
