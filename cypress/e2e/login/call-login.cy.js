beforeEach(() => {
  cy.visit('/')
})

it('logs in by typing', () => {
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

// get the native code to set the value of an input element
// because React framework overwrites it
// https://glebbahmutov.com/blog/cypress-v10-tips/#control-react-slider
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value',
).set

Cypress.Commands.add(
  'change',
  { prevSubject: 'element' },
  ($element, value) => {
    if ($element.length !== 1) {
      throw new Error('Expected an element to change value')
    }
    const el = $element[0]
    if (el.nodeName !== 'INPUT') {
      throw new Error(`Expected an input element, got ${el.nodeName}`)
    }
    const log = Cypress.log({ name: 'change', message: String(value) })
    nativeInputValueSetter.call(el, value)
    el.dispatchEvent(new Event('change', { bubbles: true }))
  },
)

it.only('logs in', () => {
  cy.get('[data-test="username"]').change('standard_user')
  cy.get('[data-test="password"]').change('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})
