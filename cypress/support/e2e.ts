// @ts-ignore
Cypress.Commands.add('fillForm', () => {
  // fill the checkout information form
  cy.get('.checkout_info_wrapper form').within(() => {
    cy.get('#first-name').type('Joe')
    cy.get('#last-name').type('Smith')
    cy.get('#postal-code').type('90210')
  })
  // the command yields the result of the last command
  // which is cy.within which yields its subject,
  // thus this command yields the form element!
})
