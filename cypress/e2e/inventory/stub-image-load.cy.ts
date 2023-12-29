import { LoginPage } from '@support/pages/login.page'

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
  })

  it('shows a broken thumbnail', () => {
    // intercept all calls to load images
    // that have "bolt-shirt" in their resource url
    // https://on.cypress.io/intercept
    // give the intercept an alias "image"
    // https://on.cypress.io/as
    cy.intercept(
      { resourceType: 'image', pathname: /\/bolt-shirt/ },
      { statusCode: 404 },
    ).as('image')
    // visit the inventory item with id 1
    cy.visit('/inventory-item.html?id=1')
    // confirm the thumbnail image was loaded by the page
    // by waiting for the network alias "image"
    // https://on.cypress.io/image
    cy.wait('@image')
    // confirm the image element has not loaded
    // - get the image element
    // - get its property "naturalWidth"
    // - check if it is zero
    // For an example, read "Check More Things Before Clicking"
    // https://glebbahmutov.com/blog/check-more-things/
    cy.get('img.inventory_details_img')
      .should('be.visible')
      .its('0.naturalWidth')
      .should('equal', 0)
    // Tip: you can get a element's property
    // using cy.prop from cypress-map plugin
    cy.get('img.inventory_details_img')
      .should('be.visible')
      .prop('naturalHeight')
      .should('equal', 0)
  })
})
