/**
 * Sorts inventory by the given sort order
 * @param {'lohi'|'hilo'|'az'|'za'} sortOrder
 */
function selectSort(sortOrder) {
  expect(sortOrder, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
  // find the sort dropdown and select the low to high value
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  cy.getByTest('product_sort_container').select(sortOrder)
}

/**
 * Confirms the inventory items were sorted on the page
 * What gets sorted depends on the sort order (text or price)
 * @param {'lohi'|'hilo'|'az'|'za'} sortOrder
 */
function confirmSorted(sortOrder) {
  const assertion =
    sortOrder === 'lohi' || sortOrder === 'az'
      ? 'be.ascending'
      : 'be.descending'

  if (sortOrder === 'lohi' || sortOrder === 'hilo') {
    // find all price elements and map them to numbers
    // following the "Lesson 02" solution
    // Tip: use cypress-map queries
    cy.get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
      // confirm the list of numbers is sorted
      // https://www.chaijs.com/plugins/chai-sorted/
      .should(assertion)
  } else {
    // items should be sorted by name
    cy.get('.inventory_item_name')
      .map('innerText')
      .print('sorted names %o')
      .should(assertion)
  }
}

describe('sorted', () => {
  it('by price', () => {
    cy.visit('/')
    // Tip: grab the username and the password from the login page
    // It is ok for now to hardcode it in the spec source here
    //
    // get the username field and type the standard user
    // https://on.cypress.io/get
    // https://on.cypress.io/type
    cy.getByTest('username').type('standard_user')
    // get the password field and type the password
    cy.getByTest('password').type('secret_sauce')
    // get the login button and click on it
    // https://on.cypress.io/click
    cy.getByTest('login-button').click()
    // you should transition to the inventory page
    // https://on.cypress.io/location
    // see assertion examples at
    // https://glebbahmutov.com/cypress-examples/commands/location.html
    cy.location('pathname').should('equal', '/inventory.html')
    const sortOrder = 'az'
    selectSort(sortOrder)
    confirmSorted(sortOrder)
  })
})
