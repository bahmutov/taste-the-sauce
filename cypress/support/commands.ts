Cypress.Commands.add(
  'fillForm',
  {
    prevSubject: 'element',
  },
  ($form, inputs) => {
    // fill the checkout information form
    //   cy.get('.checkout_info_wrapper form').within(() => {
    //     cy.get('#first-name').type('Joe')
    //     cy.get('#last-name').type('Smith')
    //     cy.get('#postal-code').type('90210')
    //   })

    // cy.wrap($form, { log: false }).within(() => {
    //   cy.get('#first-name').type('Joe')
    //   cy.get('#last-name').type('Smith')
    //   cy.get('#postal-code').type('90210')
    // })
    // the command yields the result of the last command
    // which is cy.within which yields its subject,
    // thus this command yields the form element!

    cy.wrap($form, { log: false }).within(() => {
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value)
        cy.get(selector).should('have.value', value)
      })
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).should('have.value', value)
      })
    })
  },
)

Cypress.Commands.add('getByTest', (testId) => {
  cy.get(`[data-test=${testId}]`)
})
