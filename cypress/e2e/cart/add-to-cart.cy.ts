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

  it('adds the first item to cart', { viewportHeight: 1200 }, () => {
    const po = new InventoryPage()
    po.addToCart(3)
    // the POM method stores the product name in the alias
    cy.get<string>('@itemName')
      .should('be.a', 'string')
      .then((productName) => {
        po.goToCart()
        // confirm the item is in the cart
        cy.contains('.inventory_item_name', productName)
      })
  })
})
