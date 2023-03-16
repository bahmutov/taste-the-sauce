import { LoginPage } from './login.page'
import { InventoryPage } from './inventory.page'
import { LoginInfo } from '.'

describe('Cart', () => {
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

  it(
    'can be controlled via application methods',
    { viewportHeight: 1200 },
    () => {
      cy.log('**cart starts empty**')
      // get the shopping cart object reference
      // https://on.cypress.io/window
      // https://on.cypress.io/its
      // and call the production code method
      // that returns the cart contents list of ids
      // it should be an empty array
      cy.log('**adds an item by making a method call**')
      // add a product id 2 to the cart using ShoppingCart method
      // add a product id 4 to the cart using ShoppingCart method
      // confirm the cart badge element on the page
      // shows the badge text 2
      // hint: use the InventoryPage page object methods
      // to interact with the page user interface
      //
      // grab the ShoppingCart reference again
      // and call the production method to get the cart contents
      // it should now be the list [2, 4]
      cy.log('**visit the cart page**')
      // visit the cart page
      // https://on.cypress.io/visit
      // there should be two items in the cart list
    },
  )
})
