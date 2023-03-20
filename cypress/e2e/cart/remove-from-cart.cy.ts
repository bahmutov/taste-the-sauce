import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

describe('Cart', () => {
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

  it('removes items from cart', { viewportHeight: 1200 }, () => {
    // using the inventory page object
    // add 'Sauce Labs Bike Light' and 'Sauce Labs Bolt T-Shirt' items
    InventoryPage.addItemToCart('Sauce Labs Bike Light')
    InventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt')
    // the cart icon should show badge with number 2
    // and once you click it, you should transition to the cart page
    InventoryPage.getCartBadge().should('have.text', 2).click()
    cy.log('**we are on the cart page**')
    cy.location('pathname').should('equal', '/cart.html')
    // there should 2 items in the cart
    cy.get('.cart_list .cart_item').should('have.length', 2)
    cy.log('**remove the Bike Light**')
    // find the cart item with text "Bike Light"
    // and click the Remove button
    cy.contains('.cart_list .cart_item', 'Bike Light')
      .contains('button', 'Remove')
      .click()
    cy.log('**the T-shirt item still remains**')
    // there should be a single cart item
    // and it should have text "Bolt T-Shirt"
    cy.get('.cart_list .cart_item')
      .should('have.length', 1)
      .contains('Bolt T-Shirt')
    // the cart badge should show number 1
    InventoryPage.getCartBadge().should('have.text', 1)
  })
})
