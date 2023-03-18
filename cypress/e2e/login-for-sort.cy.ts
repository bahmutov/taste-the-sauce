// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
// @ts-ignore
chai.use(require('chai-sorted'))

describe('sorting', () => {
  let sessionCookie: Cypress.Cookie

  beforeEach(() => {
    if (sessionCookie) {
      cy.setCookie('session-username', sessionCookie.value, sessionCookie)
      cy.visit('/inventory.html')
    } else {
      cy.log('**log in**')
      cy.visit('/')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
      cy.location('pathname').should('equal', '/inventory.html')
      cy.getCookie('session-username')
        .should('exist')
        .then((cookie) => {
          if (cookie) {
            sessionCookie = cookie
            console.log(cookie)
          }
        })
    }
  })

  /**
   * Sorts item by price or name
   * @param order Sort order value
   */
  function sortBy(order: 'lohi' | 'hilo' | 'az' | 'za') {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by ${order}**`)
    cy.get('[data-test="product_sort_container"]').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  function getNames() {
    return cy.get('.inventory_item_name').map('innerText').print('items %o')
  }

  it('by price lowest to highest', () => {
    sortBy('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to highest', () => {
    sortBy('hilo')
    // confirm the item prices are sorted from highest to lowest
    getPrices().should('be.descending')
  })

  it('by name from A to Z', () => {
    sortBy('az')
    getNames().should('be.ascending')
  })

  it('by name from Z to A', () => {
    sortBy('za')
    getNames().should('be.descending')
  })
})
