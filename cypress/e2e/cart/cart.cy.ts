import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'
import { InventoryData } from '@fixtures/inventory-data'
import { ShoppingCart } from '../../../src/utils/shopping-cart'

describe('Cart', { viewportHeight: 1200 }, () => {
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

  it('shows the added items in order they were added', () => {
    const items = [
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Onesie',
    ]
    // find an id for each inventory item by name
    // and store the ids in the array "ids"
    // const ids = ...
    const ids = items
      .map((name) => Cypress._.find(InventoryData, { name })!.id)
      .map((id) => ({ id, n: 1 }))
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
          cy.get('.cart_quantity').should('have.value', 1)
        })
    })
    // get the application window object
    // https://on.cypress.io/window
    cy.window()
      // get its property "localStorage"
      // https://on.cypress.io/its
      .its('localStorage')
      // and call the method "getItem" to get the cart contents
      // https://on.cypress.io/invoke
      .invoke('getItem', 'cart-contents')
      .should('exist')
      // confirm the list has the expected product ids
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      // Tip: local storage usually has stringified JSON
      // @ts-ignore
      .then(JSON.parse)
      .should('deep.equal', ids)

    cy.log('**continue shopping**')
    cy.contains('button', 'Continue Shopping').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('navigates to the item from the cart', () => {
    const itemId = 3
    const item = InventoryData[itemId]
    ShoppingCart.setCartContents([{ id: itemId, n: 1 }])
    // visit the cart page
    cy.visit('/cart.html')
    // find the anchor link for the item and click it
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    cy.contains('.cart_item_label a', item.name).click()
    // confirm you are on the inventory item page
    // and the search parameters include id=itemId
    cy.location('pathname').should('equal', '/inventory-item.html')
    cy.location('search').should('include', `id=${itemId}`)
  })

  it('has id and quantity data- attributes', () => {
    // set the shopping cart contents
    // to 3 different items with 3 different quantities
    ShoppingCart.setCartContents([
      { id: 1, n: 1 },
      { id: 4, n: 2 },
      { id: 5, n: 3 },
    ])
    // visit the cart page
    //
    // there should be 3 cart item elements on the page
    //
    // grab the first cart item element
    // https://on.cypress.io/first
    //
    // the next commands come from cypress-map plugin
    // the first cart element should have property "dataset"
    // that you can print to Command Log
    // see cy.prop and cy.print
    //
    // the dataset is an object with string values
    // which you should map to numbers using cy.map
    //
    // the object should have item id 1 with quantity 1
  })
})
