import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

describe('Products', { viewportHeight: 1600 }, () => {
  const user: LoginInfo = Cypress.env('users').standard
  beforeEach(() => {
    LoginPage.login(user.username, user.password)

    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('retrieves each sort order name', () => {
    // fetch the list of options from the sort order SELECT element
    cy.getByTest('product_sort_container')
      .find('option')
      // confirm there are at least a couple
      .should('have.length.above', 2)
      // map each OPTION element to its inner text
      // using cypress-map query cy.map
      .map('innerText')
      // optional: print the list of names
      .print()
      // then select each sort name one by one
      // and confirm the sorting name shown on the page matches
      .then((sortOrders) => {
        sortOrders.forEach((sortOrder: string) => {
          cy.log(`**trying ${sortOrder}**`)
          cy.getByTest('product_sort_container').select(sortOrder)
          cy.getByTest('sorting-name', sortOrder).should('be.visible')
        })
      })
  })
})
