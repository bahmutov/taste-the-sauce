import { LoginPage } from './login.page'
import { LoginInfo } from '.'
import { InventoryData } from '../../src/utils/InventoryData'

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
  })

  it('shows the cart items', { viewportHeight: 1200 }, () => {
    const items = [
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Onesie',
    ]
    // find an id for each inventory item by name
    // and store the ids in the array "ids"
    // const ids = ...
    const ids = items.map((name) => Cypress._.find(InventoryData, { name })!.id)
    // set the ids in the local storage item "cart-contents"
    // Tip: local storage usually has stringified data
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    // visit the cart page
    // https://on.cypress.io/visit
    cy.visit('/cart.html')
    // confirm each item name is present
    // confirm the cart items list has the right number of elements
    cy.get('.cart_list .cart_item').should('have.length', items.length)
    cy.log('**shows each item in order**')
    // iterate over the items
    items.forEach((itemName, k) => {
      // confirm each itm is at the right place
      // on the page in the list of items
      // https://on.cypress.io/get
      // https://on.cypress.io/eq
      cy.get('.cart_list .cart_item')
        .eq(k)
        .within(() => {
          // and confirm that within the item the name
          // is correct and the quantity is 1
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity', 1)
        })
    })
  })
})
