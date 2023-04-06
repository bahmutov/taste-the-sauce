describe('sorting tests', () => {
  beforeEach(() => {
    cy.dataSession({
      name: 'user session',
      setup() {
        cy.log('**log in**')
        cy.visit('/')
        cy.getByTest('username').type('standard_user')
        cy.getByTest('password').type('secret_sauce')
        cy.getByTest('login-button').click()
        cy.location('pathname').should('equal', '/inventory.html')
        // the value yielded by the last command
        // will be saved in memory as data session "user session"
        cy.getCookie('session-username').should('exist')
      },
      expires: 9_000, // 9 seconds
      // the argument is the memory value of this data session
      recreate(userCookie: Cypress.Cookie) {
        cy.setCookie('session-username', userCookie.value, userCookie)
        cy.visit('/inventory.html')
        // confirm we are logged in and not redirected to the root page
        cy.location('pathname').should('equal', '/inventory.html')
      },
      shareAcrossSpecs: true,
    })
  })

  /**
   * Sorts item by price or name
   * @param order
   */
  function sortBy(order: 'lohi' | 'hilo' | 'az' | 'za') {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by ${order}**`)
    cy.getByTest('product_sort_container').select(order)
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

  it('does nothing for invalid sort options', () => {
    // the current sort option
    cy.contains('.active_option', 'Name (A to Z)')
    cy.getByTest('product_sort_container').invoke(
      'append',
      '<option value="nope">Nope</option>',
    )
    cy.getByTest('product_sort_container').select('nope')
    // the active sort option is blank
    cy.get('.active_option').should('have.text', '')
  })
})
