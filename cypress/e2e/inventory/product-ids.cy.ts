import { LoginPage } from '@support/pages/login.page'

describe('Products', () => {
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

  it('have unique ids', () => {
    // get all inventory items, there should be more than 3
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .mapInvoke('getAttribute', 'data-itemid')
      .print('ids %o')
      .should((ids) => {
        const unique = Cypress._.uniq(ids)
        expect(unique).to.deep.equal(ids)
      })
  })
})
