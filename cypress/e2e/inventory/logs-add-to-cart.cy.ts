import { LoginPage } from '@support/pages/login.page'

describe('Inventory list', { viewportHeight: 1600 }, () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('calls the console.log method', () => {
    // spy on the application's window "console.log" method
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/spy
    // give the spy an alias "log"
    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('log')
      })
    // there should be more than 1 inventory item on the page
    cy.get('.inventory_item')
      .should('have.length.above', 1)
      // grab the 3rd inventory item
      // https://on.cypress.io/eq
      .eq(2)
      // and click on the button with the text "Add to cart"
      // https://on.cypress.io/contains
      // https://on.cypress.io/click
      .contains('button', 'Add to cart')
      .click()

    // the third item on the page should have id 1
    const itemId = 1
    // get the alias to the "log" spy and confirm:
    // - it was called once
    // - it was called once with exact parameters
    // - it was called once with a string plus item id
    cy.get('@log').should('have.been.calledOnce')
    cy.get('@log').should(
      'have.been.calledOnceWithExactly',
      'add to cart item %d',
      itemId,
    )
    cy.get('@log').should(
      'have.been.calledOnceWithExactly',
      Cypress.sinon.match.string,
      itemId,
    )
  })
})
