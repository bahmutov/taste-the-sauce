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
    'shows the added items in order they were added',
    { viewportHeight: 1200 },
    () => {
      const items = [
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Onesie',
      ]
      // add each item to cart using the InventoryPage object
      cy.log('**added all items to cart**')
      // confirm the cart badge shows the right number of items
      // then click on it
      // https://on.cypress.io/click
      // confirm we move to the cart page
      // https://on.cypress.io/location
      items.forEach(InventoryPage.addItemToCart)
      InventoryPage.getCartBadge().should('have.text', items.length)
      cy.get('.shopping_cart_link').click()
      cy.location('pathname').should('eq', '/cart.html')
      // confirm the cart items list has the right number of elements
      cy.get('.cart_item').should('have.length', items.length)
      cy.log('**shows each item in order**')
      // iterate over the items
      // confirm each itm is at the right place
      // on the page in the list of items
      // https://on.cypress.io/get
      // https://on.cypress.io/eq
      // and confirm that within the item the name
      // is correct and the quantity is 1
      cy.get('.cart_item').each(($item, index) => {
        cy.wrap($item)
          .find('.inventory_item_name')
          .should('have.text', items[index])
        cy.wrap($item).find('.cart_quantity').should('have.text', 1)
      })
    },
  )
})
