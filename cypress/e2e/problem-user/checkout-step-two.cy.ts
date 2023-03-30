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

  it('computes the incorrect order total', () => {
    // pick the first 4 items
    InventoryPage.addItemToCart(InventoryData[0].name)
    InventoryPage.addItemToCart(InventoryData[1].name)
    InventoryPage.addItemToCart(InventoryData[2].name)
    InventoryPage.addItemToCart(InventoryData[3].name)
    // go directly to the checkout step 2 page
    cy.visit('/checkout-step-two.html')

    // confirm the problem user for some reason
    // only sees 2 items in the cart
    InventoryPage.getCartBadge().should('have.text', 2)
    // confirm the shopping cart only has items with id 0 and 2
    // (1 of each)
    cy.window()
      .its('ShoppingCart')
      .invoke('getCartContents')
      .should('deep.equal', [
        { id: 0, n: 1 },
        { id: 2, n: 1 },
      ])

    // click on the Finish button
    // and confirm the shopping cart was not reset
    cy.contains('[data-test=finish]', 'Finish').click()
    // we should be on the checkout complete page
    cy.location('pathname').should('equal', '/checkout-complete.html')
    // it shows the checkout complete component
    cy.get('#checkout_complete_container').should('be.visible')
    // the shopping cart still has 2 items
    cy.window()
      .its('ShoppingCart')
      .invoke('getCartContents')
      .should('have.length', 2)
  })

  // Bonus: let's confirm clicking the "Cancel" button on this page
  // goes back to the inventory page
  it('goes to the inventory page on cancel', () => {
    cy.visit('/checkout-step-two.html')
    cy.contains('button', 'Cancel').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
})
