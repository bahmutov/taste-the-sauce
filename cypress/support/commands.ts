Cypress.Commands.add(
  'fillForm',
  // @ts-ignore
  { prevSubject: 'element' },
  ($form, inputs) => {
    cy.wrap($form, { log: false }).within(() => {
      // iterate over the input fields
      // and type into each selector (key) the value
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value)
        // confirm the input has been set correctly
        cy.get(selector).should('have.value', value)
      })

      Cypress._.forEach(inputs, (value, selector) => {
        // confirm the input still holds the entered value
        cy.get(selector).should('have.value', value)
      })
    })
  },
)

Cypress.Commands.add(
  'getByTest',
  { prevSubject: 'optional' },
  (parentElement, testId, text?: string) => {
    console.log({ parentElement, testId })
    const selector = `[data-test="${testId}"]`
    if (text) {
      const log = Cypress.log({
        name: 'getByTest',
        message: `${testId} "${text}"`,
      })
      // query the elements by the "data-test=..." attribute with the given text
      if (parentElement) {
        cy.wrap(parentElement, { log: false }).contains(selector, text)
      } else {
        cy.contains(selector, text)
      }
    } else {
      const log = Cypress.log({ name: 'getByTest', message: testId })
      // query the elements by the "data-test=..." attribute
      if (parentElement) {
        cy.wrap(parentElement, { log: false }).find(selector)
      } else {
        cy.get(selector)
      }
    }
  },
)
