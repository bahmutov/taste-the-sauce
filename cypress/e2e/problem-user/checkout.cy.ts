import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { InventoryData } from '@fixtures/inventory-data'
import { CheckoutPage } from '@support/pages/checkout.page'

describe('Problem user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    const user: LoginInfo = Cypress.env('users').problem
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  // inspect the code coverage reports
  // to find all places where the problem user has its own separate branch
  // try to write e2e (or component) tests to cover those code branches

  it('mishandles the user information form', () => {
    // pick the first item
    InventoryPage.addItemToCart(InventoryData[0].name)
    cy.visit('/checkout-step-one.html')
    // enter "Joe Smith 90210"
    // Tip: get the selectors from the CheckoutPage object
    // and type the text yourself to bypass our checks
    cy.get(CheckoutPage.selectors.firstName).type('Joe')
    cy.get(CheckoutPage.selectors.lastName).type('Smith')
    cy.get(CheckoutPage.selectors.postalCode).type('90210')
    // and confirm the application form
    // shows the following:
    // first name: "h"
    // last name: ""
    // zip code: "90210"
    // https://glebbahmutov.com/cypress-examples/commands/assertions.html
    cy.get(CheckoutPage.selectors.firstName).should('have.value', 'h')
    cy.get(CheckoutPage.selectors.lastName).should('have.value', '')
    cy.get(CheckoutPage.selectors.postalCode).should('have.value', '90210')
    // click on the Continue button
    cy.get('#continue').click()
    // the form shows an error message "Last Name is required"
    cy.contains('.error', 'Last Name is required')
      .should('be.visible')
      // find the close button and click it to get rid of the error
      .find('button.error-button')
      .click()
    cy.get('.error').should('not.exist')
  })
})
