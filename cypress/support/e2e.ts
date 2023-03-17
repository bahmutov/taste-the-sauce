// @ts-ignore
Cypress.Commands.add('fillForm', () => {
  // fill the checkout information form
  cy.get('.checkout_info_wrapper form').within(() => {
    cy.get('#first-name').type('Joe')
    cy.get('#last-name').type('Smith')
    cy.get('#postal-code').type('90210')
    cy.get('input[type=submit]')
      .should('have.attr', 'value', 'Continue')
      .click()
  })
})
