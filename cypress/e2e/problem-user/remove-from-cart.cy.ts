import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { InventoryData } from '@fixtures/inventory-data'
import { LoginInfo } from '..'
import { ShoppingCart } from '../../../src/utils/shopping-cart'

describe('Problem user', () => {
  const user: LoginInfo = Cypress.env('users').problem

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
  })

  it(
    'does not remove even items from the cart',
    { viewportHeight: 1200 },
    () => {
      ShoppingCart.setCartContents([
        {
          id: 0,
          n: 1,
        },
        {
          id: 1,
          n: 1,
        },
        {
          id: 2,
          n: 1,
        },
        {
          id: 3,
          n: 1,
        },
      ])
      cy.visit('/inventory.html')
      cy.location('pathname').should('equal', '/inventory.html')

      // confirm the cart badge shows 4 items

      cy.log('**removes item with odd id from the cart**')
      // remove an item with id 1 by clicking on the "Remove" button
      // and confirm the cart badge shows 3 items

      cy.log('**does not remove item with even id**')
      // remove an item with id 2 by clicking on the "Remove" button
      // confirm the cart badge still shows 3 items
      // note: one has to be careful with negative assertions
      // what if the item removal takes a little bit longer than an instant?
    },
  )
})
