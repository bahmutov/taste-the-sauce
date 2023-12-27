/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    // add method fillForm here
    /**
     * Fill the current form (the parent subject)
     * with the given values. The argument is an object
     * with the keys being selectors and values being the strings
     * to type into the input fields.
     * @example
     *  cy.get('form').fillForm({ '#name': 'Joe' }).submit()
     */
    fillForm(selectorsValue: object): Chainable<JQuery<HTMLFormElement>>
    getByTest(testId: string): Chainable<JQuery<HTMLFormElement>>
  }
}
