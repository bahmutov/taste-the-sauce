import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

const user: LoginInfo = Cypress.env('users').standard
// we can even check if the user object is valid
if (!user) {
  throw new Error('Missing the standard user')
}

// before each test, quickly login the user
// or restore the previous user session
beforeEach(() => {
  LoginPage.login(user.username, user.password)
})

it('shows the cart items', { viewportHeight: 1200 }, () => {
  const ids = [
    { id: 0, n: 1 },
    { id: 1, n: 2 },
    { id: 2, n: 5 },
  ]
  // set the ids in the local storage item "cart-contents"
  window.localStorage.setItem('cart-contents', JSON.stringify(ids))
  cy.visit('/cart.html')
  cy.getByTest('CartBadge', '3')
  cy.getByTest('CartContents').should('be.visible')
  cy.getByTest('CartItem').should('have.length', 3)
  // iterate over the data and verify each item shown
  ids.forEach((id, k) => {
    cy.getByTest('CartItem')
      .eq(k)
      .getByTest('CartQuantity')
      .should('have.value', ids[k].n)
  })
})
