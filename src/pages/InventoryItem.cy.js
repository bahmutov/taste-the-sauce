import React from 'react'
import InventoryItem from './InventoryItem'
import { InventoryData } from '../utils/InventoryData'
import { setCredentials, isProblemUser } from '../utils/Credentials'
import { ShoppingCart } from '../utils/shopping-cart'
// the "@cypress" Webpack alias is defined in the "cypress.config.js"
import { InventoryPage } from '@cypress/support/pages/inventory.page'

describe('InventoryItem', { viewportHeight: 1000 }, () => {
  it('shows an item', () => {
    // what do you see when you try to mount the component?
    // cy.mount(<InventoryItem />)
    // what do you see when you mount the component by itself?
    // cy.mountWithRouter(<InventoryItem />)
    //
    // pick a random number between 0 and the inventory length
    // using Lodash Cypress._.random method
    const id = Cypress._.random(0, InventoryData.length - 1)
    cy.log(`showing item ${id}`)
    // mount the InventoryItem component
    // passing your own search string "id=..."
    // Tip: modify the InventoryItem to read the window.location.search
    // or the passed search prop
    //
    cy.mountWithRouter(<InventoryItem search={'id=' + id} />)
    const item = InventoryData[id]
    // confirm the component shows the item's name, description, and price
    cy.get('.inventory_details_desc_container').within(() => {
      cy.contains('.inventory_details_name', item.name)
      cy.contains('.inventory_details_desc', item.desc)
      cy.contains('.inventory_details_price', '$' + item.price)
    })
  })

  it('adds an item to the cart and then removes it', () => {
    // mount an inventory item with id 1
    // cy.mountWithRouter
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    // find the button with text "Add to cart"
    // and click on it
    cy.contains('button', 'Add to cart').click()
    // confirm the cart badge is visible and has 1
    // Tip: you can use page objects in this test
    InventoryPage.getCartBadge().should('be.visible').and('have.text', 1)
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove').click()
    // the cart badge should be gone
    InventoryPage.getCartBadge().should('not.exist')
  })

  it('stores the cart items in the local storage (cy.then)', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart')
      .click()
      // get the "cart-contents" from the local storage
      // and verify it contains an array with just number 1 inside
      .then(() => {
        expect(localStorage.getItem('cart-contents')).to.equal(
          '[{"id":1,"n":1}]',
        )
      })
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove')
      .click()
      // verify the local storage has cart contents as an empty list
      .then(() => {
        expect(localStorage.getItem('cart-contents')).to.equal('[]')
      })
  })

  it('stores the cart items in the local storage (cy.should)', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart')
      .click()
      // get the "cart-contents" from the local storage
      // and verify it contains an array with just number 1 inside
      // by retrying an assertion
      .should(() => {
        expect(localStorage.getItem('cart-contents')).to.equal(
          '[{"id":1,"n":1}]',
        )
      })
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove')
      .click()
      // verify the local storage has cart contents as an empty list
      // by retrying an assertion
      .should(() => {
        expect(localStorage.getItem('cart-contents')).to.equal('[]')
      })
  })

  it('stores the cart items in the local storage', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart').click()
    // get the "cart-contents" from the local storage
    // and verify it contains an array with just number 1 inside
    cy.wrap(localStorage)
      .invoke('getItem', 'cart-contents')
      // the local storage entry is a string
      // convert it to an array
      .apply(JSON.parse)
      .should('deep.equal', [{ id: 1, n: 1 }])
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove').click()
    // verify the local storage has cart contents as an empty list
    cy.wrap(localStorage)
      .invoke('getItem', 'cart-contents')
      .apply(JSON.parse)
      .should('deep.equal', [])
  })

  it('shows non-existent item', () => {
    cy.mountWithRouter(<InventoryItem search="id=10001" />)
    cy.contains('.inventory_details_name', 'ITEM NOT FOUND')
    cy.get('.inventory_details_img').should(
      'have.attr',
      'alt',
      'ITEM NOT FOUND',
    )
  })

  it('handles missing id in the search params', () => {
    // mount the InventoryItem without search prop
    // and confirm it shows "Item not found"
    cy.mountWithRouter(<InventoryItem />)
    cy.contains('.inventory_details_name', 'ITEM NOT FOUND')
  })

  context('Problem user', () => {
    beforeEach(() => {
      // set the user credentials
      // (hard-code the username and the password for now)
      // and confirm the current user is the problem one
      // Tip: call the application's code
      // setCredentials and isProblemUser
      setCredentials('problem_user', 'secret_sauce')
      expect(isProblemUser()).to.be.true
    })

    it('adds even items to the cart', () => {
      // mount an item with id 2 (even)
      cy.mountWithRouter(<InventoryItem search="id=2" />)
      // find the button with text "Add to cart"
      // and click on it
      cy.contains('button', 'Add to cart').click()
      // confirm the cart badge shows one item
      InventoryPage.getCartBadge().should('have.text', 1)
    })

    it('does not add odd items to the cart', () => {
      // mount the InventoryItem with an odd id
      cy.mountWithRouter(<InventoryItem search="id=1" />)
      // find the button with text "Add to cart"
      // and click on it
      cy.contains('button', 'Add to cart').click()
      // confirm the cart badge does not appear
      InventoryPage.getCartBadge().should('not.exist')
    })

    it('removes odd item from the cart', () => {
      // add items with id 1 and 2 to the shopping cart
      ShoppingCart.addItem(1)
      ShoppingCart.addItem(2)
      // mount the inventory item with id 1 (odd)
      cy.mountWithRouter(<InventoryItem search="id=1" />)
      // confirm the cart badge shows two items
      InventoryPage.getCartBadge().should('have.text', 2)
      // find the button with text "Remove"
      // and click on it
      cy.contains('button', 'Remove').click()
      // confirm the cart badge shows one item
      InventoryPage.getCartBadge().should('have.text', 1)
      // confirm the correct items remain in the shopping cart
      cy.wrap(ShoppingCart, { log: false })
        .invoke('getCartContents')
        .should('deep.equal', [{ id: 2, n: 1 }])
    })

    it('remove even items from the cart', () => {
      // add items with id 1 and 2 to the shopping cart
      ShoppingCart.addItem(1)
      ShoppingCart.addItem(2)
      // mount the inventory item with id 2 (even)
      cy.mountWithRouter(<InventoryItem search="id=2" />)
      // confirm the cart badge shows two items
      InventoryPage.getCartBadge().should('have.text', 2)
      // find the button with text "Remove"
      // and click on it
      cy.contains('button', 'Remove').click()
      // confirm the cart badge still shows two items in the cart
      InventoryPage.getCartBadge().should('have.text', 2)
    })
  })
})
