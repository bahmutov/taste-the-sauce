// https://github.com/bahmutov/cypress-map
import 'cypress-map'
import { Route, BrowserRouter } from 'react-router-dom'
import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('mountWithRouter', (Component) => {
  return mount(
    <BrowserRouter initialEntries={[]}>
      <Route>{Component}</Route>
    </BrowserRouter>,
  )
})
