import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

beforeEach(() => {
  const user: LoginInfo = Cypress.env('users').standard
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html')
  cy.location('pathname').should('equal', '/inventory.html')
})

const CartPageObject = {
  removeCartItem(k: number) {
    // get the current number of items in the cart
    cy.getByTest('CartItem')
      .its('length')
      .then((n) => {
        cy.getByTest('CartItem')
          .eq(k)
          // can you fix this code to make sure
          // the "find" and "click" commands appear
          // in the Cypress Command Log?
          .contains('button', 'Remove')
          .click()
        // confirm the item has been removed
        // by checking the new number of items in the cart
        // It should N - 1
        cy.getByTest('CartItem')
          // Note: potentially there might be no items left
          .should(Cypress._.noop)
          .its('length')
          .should('equal', n - 1)
      })
  },
}

describe('Cart', () => {
  it('removes an item from cart', { viewportHeight: 1200 }, () => {
    // add the item "Bike Light" to the cart
    cy.getByTest('InventoryPageItem', 'Bike Light')
      .contains('button', 'Add to cart')
      .click()
    // confirm the item has been added to the cart
    cy.getByTest('InventoryPageItem', 'Bike Light').contains('button', 'Remove')
    // alternative: check the cart badge
    cy.getByTest('CartBadge', '1').should('be.visible').click()
    // confirm you are on the cart page
    cy.location('pathname').should('equal', '/cart.html')
    // try removing the item using the page object method
    CartPageObject.removeCartItem(0)
    // the cart badge should not exist
    cy.getByTest('CartBadge').should('not.exist')
  })
})
