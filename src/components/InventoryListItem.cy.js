import React from 'react'
import InventoryListItem from './InventoryListItem'
import { InventoryData } from '../utils/InventoryData'
import { ShoppingCart } from '../utils/shopping-cart'

describe('InventoryListItem', () => {
  it('adds an item to the cart', () => {
    // pick an item from the inventory list
    const item = InventoryData[3]
    // mount the InventoryListItem component
    // passing the item properties (use the spread operator)
    cy.mountWithRouter(<InventoryListItem {...item} />)
    // confirm the inventory item is present on the page
    // and has the expected attribute "data-itemid" with the correct id
    cy.get('.inventory_item')
      .should('have.attr', 'data-itemid', 3)
      // find the button "Add to cart"
      // and click on it
      .contains('button', 'Add to cart')
      .click()
    // confirm the button changes to "Remove"
    cy.get('.inventory_item').contains('button', 'Remove').should('be.visible')
    // Confirm the item was added to the cart
    // we could check the local storage
    // to see if cart contents is a list [3]
    // OR we could ask the application's code
    // by importing the ShoppingCart component
    // and invoking its methods, like getCartContents()
    // and isItemInCart(item id)
    cy.wrap(ShoppingCart)
      .invoke('getCartContents')
      .should('deep.equal', [{ id: 3, n: 1 }])
    cy.wrap(ShoppingCart).invoke('isItemInCart', 3).should('be.true')

    cy.log('**remove the item**')
    cy.get('.inventory_item').contains('button', 'Remove').click()
    cy.wrap(ShoppingCart).invoke('getCartContents').should('be.empty')
  })

  it.skip('shows a broken image link', () => {
    const item = structuredClone(InventoryData[3])
    cy.intercept({ resourceType: 'image' }).as('image')
    cy.mountWithRouter(<InventoryListItem {...item} />)
  })
})
