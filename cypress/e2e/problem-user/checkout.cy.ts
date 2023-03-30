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
    //
    // and confirm the application form
    // shows the following:
    // first name: "h"
    // last name: ""
    // zip code: "90210"
    // https://glebbahmutov.com/cypress-examples/commands/assertions.html
    //
    // click on the Continue button
    // the form shows an error message "Last Name is required"
    // find the close button and click it to get rid of the error
  })
})
