import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'

describe('Product', { viewportHeight: 1600 }, () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)

    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows the item', () => {
    // the name and price of the item we are looking for
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'
    cy.contains('.inventory_item', name)
      // confirm the element has "data-itemid" attribute
      // and its value is a string
      // https://on.cypress.io/should
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      .should('have.attr', 'data-itemid')
      .should('be.a', 'string')
      // pass the value of the "data-itemid" attribute into a callback
      // https://on.cypress.io/then
      .then((itemId) => {
        // find the inventory item again
        // and inside find the anchor link element
        // https://on.cypress.io/contains
        // https://on.cypress.io/find
        cy.contains('.inventory_item', name)
          .find('.inventory_item_label a')
          // Since you know the item's id
          // you can confirm the exact value of the "id" attribute
          // (it has item id with title link text)
          .should('have.attr', 'id', `item_${itemId}_title_link`)
          // click on the anchor link
          .click()
        // confirm we transition to the item's page
        // https://on.cypress.io/location
        cy.location('pathname').should('equal', '/inventory-item.html')
        // because we know the item's id
        // confirm the URL search parameter string
        // includes "id=item id" substring
        cy.location('search').should('include', `id=${itemId}`)
        // confirm the item details component is visible
        cy.get('#inventory_item_container .inventory_details')
          .should('be.visible')
          .within(() => {
            // and inside has the item's name (with large size class)
            // and the item's expected price
            // https://on.cypress.io/within
            cy.contains('.inventory_details_name.large_size', name)
            cy.contains('.inventory_details_price', price)
          })
      })
    // go back to the inventory page by clicking
    // "Back to products" button
    cy.getByTest('back-to-products').click()
    // confirm we are back at the inventory page
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows item not found', () => {
    cy.visit('/inventory-item.html?id=10001', { failOnStatusCode: false })
    cy.contains('.inventory_details_name', 'ITEM NOT FOUND')
    cy.get('.inventory_details_img').should(
      'have.attr',
      'alt',
      'ITEM NOT FOUND',
    )
  })

  it('navigates by clicking the thumbnail image', () => {
    const name = 'Sauce Labs Fleece Jacket'
    cy.contains('.inventory_item', name)
      .find('.inventory_item_img a:has(img)')
      .click()
    cy.location('pathname').should('equal', '/inventory-item.html')
    cy.location('search').should('match', /id=\d+/)
    cy.contains('button', 'Back to products').click()
    // confirm we are back at the inventory page
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('navigates to a randomly picked item', () => {
    // randomly pick an item on the page
    // Tip: use cy.sample query command from cypress-map plugin
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .sample()
      .should('satisfy', Cypress.dom.isJquery)
      .and('have.length', 1)
      // get its name, then click on the item
      .find('.inventory_item_name')
      .then(($name) => {
        const name = $name.text()
        cy.log(`picked item "${name}"`)
        cy.wrap($name).click()
        // the browser should navigate to the item's page
        cy.location('pathname').should('equal', '/inventory-item.html')
        // confirm the page has the right item name
        cy.contains('.inventory_details_name', name)
      })
  })

  it('adds 3 random items to the cart', () => {
    // randomly pick 3 items on the page
    // Tip: use cy.sample query command from cypress-map plugin
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .sample(3)
      // confirm the subject is a jQuery object
      // with 3 elements
      .should('satisfy', Cypress.dom.isJquery)
      .and('have.length', 3)
      // from 3 items get the "Add to Cart" buttons
      .find('button:contains("Add to cart")')
      // confirm there are three buttons
      .should('have.length', 3)
      // click on them all
      .click({ multiple: true })
    // the cart badge should show 3 items in the cart
    InventoryPage.getCartBadge().should('have.text', '3')
    // there should be 3 item buttons "Remove" from cart
    cy.get('button:contains("Remove")').should('have.length', 3)
  })
})
