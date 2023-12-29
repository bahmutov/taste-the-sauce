import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { LoginInfo } from '..'

describe('Menu', () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows all items', () => {
    cy.window()
      .its('ShoppingCart')
      .invoke('setCartContents', [{ id: 0, n: 2 }])

    cy.visit('/cart.html')
    InventoryPage.getCartBadge().should('have.text', 1)

    cy.contains('button', 'Open Menu')
      .click()
      // add short wait to make this step noticeable in the video
      .wait(500)
    cy.contains('a', 'All Items').click()

    cy.location('pathname').should('equal', '/inventory.html')
    InventoryPage.getCartBadge().should('have.text', 1)
  })

  it('resets the shopping cart', () => {
    cy.window()
      .its('ShoppingCart')
      .invoke('setCartContents', [{ id: 0, n: 2 }])

    cy.visit('/cart.html')
    InventoryPage.getCartBadge().should('have.text', 1)

    cy.contains('button', 'Open Menu').click().wait(500)
    cy.contains('a', 'Reset App State').click()

    InventoryPage.getCartBadge().should('not.exist')
    cy.window()
      .its('ShoppingCart')
      .invoke('getCartContents')
      .should('deep.equal', [])
    // Note: the cart page does not reset the list of items
    // when we reset the app state, which to me seems like a bug
  })

  it.skip('goes to the About page', () => {
    cy.contains('button', 'Open Menu').click().wait(500)

    // can we hide all requests that are NOT to saucelabs.com?
    cy.intercept({ hostname: 'cdn.contentful.com' }, { log: false })
    cy.intercept({ hostname: 'cdn.cookielaw.org' }, { log: false })
    cy.intercept({ hostname: 'geolocation.onetrust.com' }, { log: false })
    cy.intercept({ hostname: 'www.google-analytics.com' }, { log: false })
    cy.intercept({ hostname: 'assets.ctfassets.net' }, { log: false })
    cy.intercept({ hostname: 'api.drift.net' }, { log: false })
    cy.intercept({ hostname: 'script.crazyegg.com' }, { log: false })
    cy.intercept({ hostname: 'tracking.crazyegg.com' }, { log: false })
    cy.intercept({ hostname: /algolia\.net/ }, { log: false })
    cy.intercept({ hostname: /techtarget\.com/ }, { log: false })
    cy.intercept({ hostname: 'stats.g.doubleclick.net' }, { log: false })

    cy.contains('a', 'About').click()

    cy.origin('saucelabs.com', () => {
      cy.log('At SauceLabs')
      cy.location('hostname').should('equal', 'saucelabs.com')
      cy.title().should('include', 'Sauce Labs')
      cy.get('header').should('be.visible')
      cy.get('img[alt="Scroll down"]').should('be.visible')
      cy.scrollTo('bottom', { duration: 2000 })
      cy.go('back')
    })
    // confirm we are back at our original origin
    cy.location('origin').should('equal', Cypress.config('baseUrl'))
  })
})
