import { LoginPage } from '@support/pages/login.page'

// before running this spec
// enable the modal popup in the "src/index.jsx"
// if (Math.random() < 1) {

// this test will fail if the popup appears and blocks the form
it.only('fills the login form', () => {
  cy.visit('/')
  // slowly type the username and the password values
  // "username" and "password"
  LoginPage.getUsername().type('username', { delay: 200 })
  LoginPage.getPassword().type('password', { delay: 100 })
  // confirm the username and the password input elements
  // have the expected values we typed
  LoginPage.getUsername().should('have.value', 'username')
  LoginPage.getPassword().should('have.value', 'password')
})

it('closes a random popup', () => {
  // visit the login page "/"
  // https://on.cypress.io/visit
  // which yields the window object
  // create a new MutationObserver object to observe
  // child list changes on the "window.document.body" node
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  cy.visit('/').then((window) => {
    const body = window.document.body
    const callback = (mutations: MutationRecord[]) => {
      // if you see a new Node with id "modal" has been added
      // set its style to "display: none" to hide it
      if (mutations.length && mutations[0].addedNodes.length) {
        // @ts-ignore TS2339
        if (mutations[0].addedNodes[0].id === 'modal') {
          console.log('added modal')
          // @ts-ignore TS2339
          mutations[0].addedNodes[0].style.display = 'none'
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(body, { childList: true })
  })
  // slowly type the username and the password values
  // "username" and "password"
  LoginPage.getUsername().type('username', { delay: 200 })
  LoginPage.getPassword().type('password', { delay: 100 })
  // confirm the username and the password input elements
  // have the expected values we typed
  LoginPage.getUsername().should('have.value', 'username')
  LoginPage.getPassword().should('have.value', 'password')
})

it('closes a random popup (window:load)', () => {
  // subscribe to the "window:before:load" event
  // create a new MutationObserver object to observe
  // child list changes on the "window.document.body" node
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  cy.on('window:load', (window) => {
    const body = window.document.body
    const callback = (mutations: MutationRecord[]) => {
      // if you see a new Node with id "modal" has been added
      // set its style to "display: none" to hide it
      if (mutations.length && mutations[0].addedNodes.length) {
        // @ts-ignore TS2339
        if (mutations[0].addedNodes[0].id === 'modal') {
          console.log('added modal')
          // @ts-ignore TS2339
          mutations[0].addedNodes[0].style.display = 'none'
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(body, { childList: true })
  })

  // visit the login page "/"
  // https://on.cypress.io/visit
  cy.visit('/')
  // slowly type the username and the password values
  // "username" and "password"
  LoginPage.getUsername().type('username', { delay: 200 })
  LoginPage.getPassword().type('password', { delay: 100 })
  // confirm the username and the password input elements
  // have the expected values we typed
  LoginPage.getUsername().should('have.value', 'username')
  LoginPage.getPassword().should('have.value', 'password')
})

// enable only if the modal always appears during testing
describe.skip('popup appears', () => {
  it('closes a random popup with window property confirmation', () => {
    // subscribe to the "window:load" event
    // create a new MutationObserver object to observe
    // child list changes on the "window.document.body" node
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    cy.on('window:load', (window) => {
      const body = window.document.body
      const callback = (mutations: MutationRecord[]) => {
        // if you see a new Node with id "modal" has been added
        // set its style to "display: none" to hide it
        if (mutations.length && mutations[0].addedNodes.length) {
          // @ts-ignore TS2339
          if (mutations[0].addedNodes[0].id === 'modal') {
            // @ts-ignore TS2339
            window.popupHandled = true
            // @ts-ignore TS2339
            mutations[0].addedNodes[0].style.display = 'none'
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(body, { childList: true })
    })

    // visit the login page "/"
    // https://on.cypress.io/visit
    cy.visit('/')
    // slowly type the username and the password values
    // "username" and "password"
    LoginPage.getUsername().type('username', { delay: 200 })
    LoginPage.getPassword().type('password', { delay: 100 })
    // confirm the username and the password input elements
    // have the expected values we typed
    LoginPage.getUsername().should('have.value', 'username')
    LoginPage.getPassword().should('have.value', 'password')
    // confirm the popup was added and hidden (retries)
    cy.window().should('have.property', 'popupHandled', true)
  })

  it('closes a random popup with object property confirmation', () => {
    const o = {
      popupHandled: false,
    }
    // subscribe to the "window:load" event
    // create a new MutationObserver object to observe
    // child list changes on the "window.document.body" node
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    cy.on('window:load', (window) => {
      const body = window.document.body
      const callback = (mutations: MutationRecord[]) => {
        // if you see a new Node with id "modal" has been added
        // set its style to "display: none" to hide it
        if (mutations.length && mutations[0].addedNodes.length) {
          // @ts-ignore TS2339
          if (mutations[0].addedNodes[0].id === 'modal') {
            o.popupHandled = true
            // @ts-ignore TS2339
            mutations[0].addedNodes[0].style.display = 'none'
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(body, { childList: true })
    })

    // visit the login page "/"
    // https://on.cypress.io/visit
    cy.visit('/')
    // slowly type the username and the password values
    // "username" and "password"
    LoginPage.getUsername().type('username', { delay: 200 })
    LoginPage.getPassword().type('password', { delay: 100 })
    // confirm the username and the password input elements
    // have the expected values we typed
    LoginPage.getUsername().should('have.value', 'username')
    LoginPage.getPassword().should('have.value', 'password')
    // confirm the popup was added and hidden (retries)
    cy.wrap(o).should('have.property', 'popupHandled', true)
  })

  it('closes a random popup with spy confirmation', () => {
    // if we know the modal always appears, we can
    // create a spy and give it an alias "modalClosed"
    // https://on.cypress.io/spy
    // https://on.cypress.io/as
    const modalClosed = cy.spy().as('modalClosed')

    // repeat the same setup as in the previous test
    cy.visit('/').then((window) => {
      const body = window.document.body
      const callback = (mutations: MutationRecord[]) => {
        if (mutations.length && mutations[0].addedNodes.length) {
          // @ts-ignore TS2339
          if (mutations[0].addedNodes[0].id === 'modal') {
            console.log('added modal')
            // @ts-ignore TS2339
            mutations[0].addedNodes[0].style.display = 'none'
            // after hiding the modal element using "display: none"
            // call the spy function we created above
            modalClosed()
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(body, { childList: true })
    })

    // slowly type the username and the password values
    // "username" and "password"
    LoginPage.getUsername().type('username', { delay: 200 })
    LoginPage.getPassword().type('password', { delay: 100 })
    // confirm the username and the password input elements
    // have the expected values we typed
    LoginPage.getUsername().should('have.value', 'username')
    LoginPage.getPassword().should('have.value', 'password')

    cy.log('**confirm the modal was hidden**')
    // confirm the spy "modalClosed" was called once (retries)
    cy.get('@modalClosed').should('have.been.calledOnce')
  })

  it('waits for the modal to click close', () => {
    cy.visit('/')

    // if the modal always appears, let's just wait for it
    // and click the "close modal" element
    cy.get('#close-modal').click()
    // then type the username and the password values
    // "username" and "password"
    LoginPage.getUsername().type('username', { delay: 200 })
    LoginPage.getPassword().type('password', { delay: 100 })
    // confirm the username and the password input elements
    // have the expected values we typed
    LoginPage.getUsername().should('have.value', 'username')
    LoginPage.getPassword().should('have.value', 'password')
  })
})
