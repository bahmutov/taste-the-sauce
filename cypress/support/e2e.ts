Cypress.Commands.add(
  'fillForm',
  { prevSubject: 'element' },
  ($form, inputs) => {
    cy.wrap($form, { log: false }).within(() => {
      // iterate over the input fields
      // and type into each selector (key) the value
      // @ts-ignore
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value)
      })
    })
  },
)
