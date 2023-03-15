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
      items.forEach(InventoryPage.addItemToCart)
      cy.log('**added all items to cart**')
      // confirm the cart badge shows the right number of items
      // then click on it
      // https://on.cypress.io/click
      InventoryPage.getCartBadge()
        .should('have.text', items.length)
        .scrollIntoView()
        .wait(1000)
        .click()
      // confirm we move to the cart page
      // https://on.cypress.io/location
      cy.location('pathname').should('equal', '/cart.html')
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
      // get the application window object
      // https://on.cypress.io/window
      // get its property "localStorage"
      // https://on.cypress.io/its
      // and call the method "getItem" to get the cart contents
      // https://on.cypress.io/invoke
      // confirm the list is [0, 1, 2]
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      // Tip: local storage usually has stringified JSON
    },
  )
})
