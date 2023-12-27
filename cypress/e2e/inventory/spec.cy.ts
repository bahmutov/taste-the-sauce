// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
// /// <reference types="cypress" />
const { _ } = Cypress

it('confirms the item with the lowest price', () => {
  cy.visit('/')

  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
  cy.get('.inventory_item').should('have.length.gte', 3)

  cy.get('.inventory_list')
    .find('.inventory_item_price')
    .map('innerText')
    .print()
    .mapInvoke('substring', 1)
    .map(parseFloat)
    .print()
    .apply(_.min)
    .should('equal', 7.99)
})

it('sorts item by price', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
  // find the sort dropdown and select the low to high value
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  cy.get('[data-test="product_sort_container"]').select('lohi')

  // find all price elements and map them to numbers
  // following the "Lesson 02" solution
  // Tip: use cypress-map queries
  cy.get('.inventory_item')
    .find('.inventory_item_price')
    .map('innerText')
    .mapInvoke('substring', 1)
    .map(Number)
    // .should((prices) => {
    //   const sorted = _.sortBy(prices)
    //   expect(prices).to.deep.equal(sorted)
    // })
    .should('be.sorted')
})
