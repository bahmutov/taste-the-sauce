/// <reference types="cypress" />
import inventory from '../fixtures/inventory.json'

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
  //
  // iterate over every data item
  //
  // and confirm there is an item on the page
  // with the name, description, and price listed
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
  // Note: check the properties in the inventory object
  interface Item {
    name: string
    desc: string
    price: number
  }

  inventory.forEach((item) => {
    cy.contains('.inventory_item', item.name).within(() => {
      cy.contains('.inventory_item_desc', item.desc)
      cy.contains('.inventory_item_price', item.price)
    })
  })
})
