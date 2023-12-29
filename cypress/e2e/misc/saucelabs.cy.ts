it.skip(
  'visits the sauce labs site',
  {
    baseUrl: 'https://saucelabs.com',
    viewportHeight: 1200,
  },
  () => {
    // block all requests by the local to sauce labs itself
    cy.intercept({ hostname: /^(?!saucelabs\.com).*$/ }, { statusCode: 500 })
    cy.visit('/')
    cy.title().should('include', 'Sauce Labs')
  },
)
