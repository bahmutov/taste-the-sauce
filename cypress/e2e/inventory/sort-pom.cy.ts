import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

const SortingPOM = {
  sortBy(order: 'az' | 'za' | 'lohi' | 'hilo') {
    // select the sorting order using the <select> element
    cy.get('select[data-test=product_sort_container]').select(order)
    // once the sorting changes
    // get the selected option text
    // and save it as alias "sortName"
    cy.get('select[data-test=product_sort_container]')
      .invoke('prop', 'selectedOptions')
      .its('0.text')
      .as('sortName')
    // alternative: get the .active_option element's text
    // cy.get('.active_option').invoke('text').as('sortName')
  },
}

describe('Products', { viewportHeight: 1600 }, () => {
  const user: LoginInfo = Cypress.env('users').standard
  beforeEach(() => {
    LoginPage.login(user.username, user.password)

    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('sorts the items and shows the sorting order', () => {
    SortingPOM.sortBy('lohi')
    // confirm the sorting name shown below the products
    // is the same as selected text in the alias "sortName"
    cy.get<string>('@sortName')
      .should('be.a', 'string')
      .then((sortName) => {
        cy.contains('[data-test=sorting-name]', sortName)
      })
  })
})
