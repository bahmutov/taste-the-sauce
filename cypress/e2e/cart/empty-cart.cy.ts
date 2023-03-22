import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

describe('Empty cart', () => {
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  it('disables the Checkout button', () => {
    LoginPage.login(user.username, user.password)
    cy.visit('/cart.html')
    InventoryPage.getCartBadge().should('not.exist')
    // confirm the user can see the disabled button
    cy.getByTest('checkout').should('be.visible').and('be.disabled')
  })
})
