import { LoginPage } from '@support/pages/login.page'

describe('Login form', () => {
  // visit the login page before each test
  beforeEach(() => {
    cy.visit('/')
  })

  it(
    'checks if the username is at least 6 characters',
    { browser: ['electron', 'chrome'] },
    () => {
      // get the username input field and focus on it
      // https://on.cypress.io/get
      // https://on.cypress.io/focus
      //
      // type username that is too short
      // using the cy.realType command from cypress-real-events plugin
      //
      // confirm the username input field has CSS pseudo class ":invalid"
      // https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
      // https://glebbahmutov.com/blog/form-validation-in-cypress/
      //
      // confirm the form is invalid by calling its method "checkValidity"
      //
      // we know we are getting a form element from the page
      //
      // confirm the validation message on the username input field
      // includes the phrase "6 characters or more"
      //
      // confirm the username input element
      // has property "validity" which is an object
      // with "tooShort: true" property
    },
  )
})
