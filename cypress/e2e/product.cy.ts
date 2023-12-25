import { LoginPage } from './login.page'
import 'cypress-map'

describe('Product', () => {
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
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows the item', () => {
    // the name and price of the item we are looking for
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'
    // select the inventory item with that name
    // click on the title link to transition to the product view
    // https://on.cypress.io/contains
    // https://on.cypress.io/find
    // https://on.cypress.io/click

    cy.contains('.inventory_item', name)
      .should('have.attr', 'data-itemid')
      .should('be.a', 'string')
      .then((itemId) => {
        cy.contains('.inventory_item_label', name)
          .find('a')
          .should('have.attr', 'id', `item_${itemId}_title_link`)
          .click()
        cy.location('pathname').should('eq', '/inventory-item.html')
        cy.location('search').should('eq', `?id=${itemId}`)
      })
    // confirm we transition to the item's page
    // https://on.cypress.io/location
    //
    // we do not know the item id, thus check
    // that the search parameters in the URL
    // simply have id=number
    // /inventory-item.html?id=5

    // confirm the item details component is visible
    cy.contains('.inventory_details', name)
      .should('be.visible')
      .within(() => {
        cy.contains('.inventory_details_name', name)
          .should('be.visible')
          .and('have.class', 'large_size')
        cy.get('.inventory_details_price').should('have.text', price)
      })
    // and inside has the item's name (with large size class)
    // and the item's expected price
    // https://on.cypress.io/within
    //
    // go back to the inventory page by clicking
    // "Back to products" button
    cy.get('[data-test="back-to-products"]').click()
    // confirm we are back at the inventory page
    cy.location('pathname').should('eq', '/inventory.html')
  })

  it.only('have unique ids', () => {
    // get all inventory items, there should be more than 3
    // from each element, get the attribute "data-itemid"
    // and confirm the ids are unique
    // https://on.cypress.io/invoke
    // https://glebbahmutov.com/cypress-examples
    cy.get('.inventory_item')
      .should('have.length.above', 3)
      .invoke('toArray')
      .invoke('map', (el: HTMLElement) => el.getAttribute('data-itemid'))
      .then((ids) => {
        const uniqueIds = Cypress._.uniq(ids)
        expect(uniqueIds).to.deep.equal(ids)
      })

    // or
    cy.get('.inventory_item')
      .should('have.length.above', 3)
      .invoke('toArray') // Retrieve all the elements contained in the jQuery set, as an array.
      .then((els) => {
        const ids = els.map((el) => el.getAttribute('data-itemid')) // getAttribute is DOM element method
        const uniqueIds = Cypress._.uniq(ids)
        expect(uniqueIds).to.deep.equal(ids)
      })

    // or
    cy.get('.inventory_item')
      .should('have.length.above', 3)
      .mapInvoke('getAttribute', 'data-itemid') // invoke getAttribute on html element
      .then((ids) => {
        const uniqueIds = Cypress._.uniq(ids)
        expect(uniqueIds).to.deep.equal(ids)
      })

    // or
    cy.get('.inventory_item')
      .should('have.length.above', 3)
      .map(Cypress.$) // convert html element to jQuery<htmlElement>
      .mapInvoke('attr', 'data-itemid') // invoke 'attr' on jQuery
      .then((ids) => {
        const uniqueIds = Cypress._.uniq(ids)
        expect(uniqueIds).to.deep.equal(ids)
      })
  })
})
