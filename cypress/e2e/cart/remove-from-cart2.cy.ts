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
      .eq(k)
      // can you fix this code to make sure
      // the "find" and "click" commands appear
      // in the Cypress Command Log?
      .then((item) => {
        item.find('button.cart_button').click()
      })
    // confirm the item has been removed
    // by checking the new number of items in the cart
    // It should N - 1
    // Note: potentially there might be no items left
  },
}

describe('Cart', () => {
  it('removes an item from cart', { viewportHeight: 1200 }, () => {
    // add the item "Bike Light" to the cart
    // confirm the item has been added to the cart
    // alternative: check the cart badge
    // confirm you are on the cart page
    // try removing the item using the page object method
    // the cart badge should not exist
  })
})
