import { LoginPage } from './login.page'
import { InventoryPage } from './inventory.page'
import { LoginInfo } from '.'
import 'cypress-map'
import invntory from '../fixtures/inventory.json'
const { _ } = Cypress

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

  it.only(
    'shows the added items in order they were added',
    { viewportHeight: 1200 },
    () => {
      const items = [
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Onesie',
      ]
      //   let ids: number[] = []
      //   items.forEach((itemName) => {
      //     cy.contains('.inventory_item', itemName)
      //       .invoke('attr', 'data-itemid')
      //       .then((id) => {
      //         ids.push(parseInt(id))
      //       })
      //   })
      const ids = items.map(
        (itemName) => _.find(invntory, { name: itemName })!.id,
      )

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

      // get the application window object
      // https://on.cypress.io/window
      // get its property "localStorage"
      // https://on.cypress.io/its
      // and call the method "getItem" to get the cart contents
      // https://on.cypress.io/invoke
      // confirm the list is [0, 1, 2]
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      // Tip: local storage usually has stringified JSON
      cy.window()
        .its('localStorage')
        .invoke('getItem', 'cart-contents')
        .should('exist')
        .print()
        .then(JSON.parse)
        .should('deep.equal', ids)
    },
  ),
    it('removes items from cart', { viewportHeight: 1200 }, () => {
      // using the inventory page object
      // add 'Sauce Labs Bike Light' and 'Sauce Labs Bolt T-Shirt' items
      // the cart icon should show badge with number 2
      // and once you click it, you should transition to the cart page
      const items = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
      items.forEach(InventoryPage.addItemToCart)
      InventoryPage.getCartBadge().should('have.text', items.length)
      cy.get('.shopping_cart_link').click()
      cy.location('pathname').should('eq', '/cart.html')
      cy.log('**we are on the cart page**')
      // there should 2 items in the cart
      cy.get('.cart_item').should('have.length', items.length)
      cy.log('**remove the Bike Light**')
      // find the cart item with text "Bike Light"
      // and click the Remove button
      cy.contains('.cart_item', items[0]).contains('button', 'Remove').click()
      cy.contains('.cart_item', items[0]).should('not.exist')
      cy.log('**the T-shirt item still remains**')
      cy.get('.cart_item').should('have.length', items.length - 1)
      cy.contains('.cart_item', items[1]).should('exist')
      InventoryPage.getCartBadge().should('have.text', items.length - 1)
      // there should be a single cart item
      // and it should have text "Bolt T-Shirt"
      // the cart badge should show number 1
    })
})
