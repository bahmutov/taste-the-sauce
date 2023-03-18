// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

interface Item {
  name: string
  desc: string
  price: number
}

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has every item from the inventory', () => {
  // load the inventory JSON fixture file
  // https://on.cypress.io/fixture
  cy.fixture('inventory.json').then((items) => {
    // iterate over every data item
    items.forEach((item: Item) => {
      cy.log(`checking 🎁 **${item.name}**`)
      // and confirm there is an item on the page
      // with the name, description, and price listed
      // https://on.cypress.io/contains
      // https://on.cypress.io/within
      // Note: check the properties in the inventory object
      cy.contains('.inventory_item', item.name).within(() => {
        cy.contains('.inventory_item_name', item.name)
        cy.contains('.inventory_item_desc', item.desc)
        cy.contains('.inventory_item_price', item.price)
      })
    })
  })
})
