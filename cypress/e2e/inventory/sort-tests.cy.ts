// cypress/e2e/sort-by-price.cy.js
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
/// <reference types="cypress-data-session" />

// https://github.com/bahmutov/cypress-map

import { LoginPage } from '../../support/pages/login.page'

// https://www.chaijs.com/plugins/chai-sorted/

function sortBy(order: string) {
  expect(order).to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
  cy.get('[data-test="product_sort_container"]').select(order)
}

function getPrices() {
  return cy
    .get('.inventory_item')
    .find('.inventory_item_price')
    .map('innerText')
    .mapInvoke('slice', 1)
    .map(Number)
    .print('sorted prices %o')
}

function getNames() {
  return cy
    .get('.inventory_item')
    .find('.inventory_item_name')
    .map('innerText')
    .print('sorted names %o')
}

describe('sorting', { testIsolation: true }, () => {
  let cookie

  beforeEach(() => {
    // method 1: use getCookie and setCookie
    // if (cookie) {
    //   cy.setCookie('session-username', cookie.value)
    //   cy.visit('/inventory.html')
    // } else {
    //   cy.log('**log in**')
    //   cy.visit('/')
    //   LoginPage.getUserName().type('standard_user')
    //   LoginPage.getPassword().type('secret_sauce')
    //   LoginPage.getLoginBtn().click()
    //   cy.getCookie('session-username')
    //     .should('exist')
    //     .then(console.log)
    //     .then((c) => {
    //       cookie = c
    //     })
    // }

    // cy.location('pathname').should('equal', '/inventory.html')

    // method 2: use cy.dataSession
    // cy.dataSession({
    //   name: 'userSession',
    //   setup() {
    //     cy.log('**log in**')
    //     cy.visit('/')
    //     LoginPage.getUserName().type('standard_user')
    //     LoginPage.getPassword().type('secret_sauce')
    //     LoginPage.getLoginBtn().click()
    //     cy.location('pathname').should('equal', '/inventory.html')
    //     cy.getCookie('session-username').should('exist')
    //   },
    //   recreate(useCookie) {
    //     cy.setCookie('session-username', useCookie.value)
    //     cy.visit('/inventory.html')
    //   },
    //   shareAcrossSpecs: true,
    // })

    // method 3: use cy.session
    cy.session('userSession', () => {
      cy.log('**log in**')
      cy.visit('/')
      LoginPage.getUsername().type('standard_user')
      LoginPage.getPassword().type('secret_sauce')
      LoginPage.getLoginBtn().click()
      cy.location('pathname').should('equal', '/inventory.html')
    })

    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })
  it('by price lowest to highest', () => {
    cy.log('**sort by price low to high**')
    // sort the items from low to high price
    // confirm the item prices are sorted from lowest to highest
    sortBy('lohi')
    getPrices().should('be.sorted')
  })

  it('by price highest to lowest', () => {
    cy.log('**sort by price low to high**')
    // sort the items from high to low price
    // confirm the item prices are sorted from highest to lowest
    sortBy('hilo')
    getPrices().should('be.sorted', { descending: true })
  })

  it('by name from A to Z', () => {
    cy.log('**sort by name A to Z**')
    // sort the items from A to Z
    // confirm the item names are sorted from A to Z
    sortBy('az')
    getNames().should('be.sorted')
  })

  it('by name from Z to A', () => {
    cy.log('**sort by name Z to A**')
    // sort the items from Z to A
    // confirm the item names are sorted from Z to A
    sortBy('za')
    getNames().should('be.sorted', { descending: true })
  })
})
