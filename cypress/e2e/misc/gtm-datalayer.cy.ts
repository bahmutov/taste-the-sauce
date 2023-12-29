import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

// print full messages
chai.config.truncateThreshold = 300

describe('dataLayer', () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('pushes cart events', () => {
    // get the application's window object
    // https://on.cypress.io/window
    // get its property "dataLayer"
    // https://on.cypress.io/its
    // and create a spy on the method "dataLayer.push"
    // https://on.cypress.io/spy
    // and give it an alias "push"
    // https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
    cy.window()
      .its('dataLayer')
      .then((dataLayer) => {
        cy.spy(dataLayer, 'push').as('push')
      })
    // add the item "Sauce Labs Onesie" to the cart
    InventoryPage.addItemToCart('Sauce Labs Onesie')
    // confirm the dataLayer.push method was called twice
    cy.get('@push').should('have.been.calledTwice')
    // confirm the dataLayer.push method was called with
    // { event: 'addToCart' }
    // Tip: you need to check calls using your custom Sinon match predicate
    cy.get('@push')
      .should(
        'have.been.calledWithMatch',
        Cypress.sinon.match((x) => x.event === 'addToCart', 'addToCart event'),
      )
      // from the spy by alias get all its calls by invoking "getCalls"
      // https://on.cypress.io/invoke
      .invoke('getCalls')
      // map the calls to just the first argument
      .invoke('map', (x: any) => x.args[0])
      // find the call {event: 'addToCart'}
      .invoke('find', (x: any) => x.event === 'addToCart')
      // it should have the following properties with values
      // event: addToCart, itemId: 2
      .should('exist')
      .and('deep.include', {
        event: 'addToCart',
        itemId: 2,
      })
      // and the property added automatically "gtm.uniqueEventId"
      .and('have.property', 'gtm.uniqueEventId')
  })
})
