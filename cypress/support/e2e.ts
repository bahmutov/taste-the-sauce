// @ts-ignore
Cypress.Commands.add('fillForm', { prevSubject: 'element' }, ($form) => {
  // fill the checkout information form
  cy.wrap($form, { log: false }).within(() => {
    cy.get('#first-name').type('Joe')
    cy.get('#last-name').type('Smith')
    cy.get('#postal-code').type('90210')
  })
  // the command yields the result of the last command
  // which is cy.within which yields its subject,
  // thus this command yields the form element!
})
