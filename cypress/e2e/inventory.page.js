// @ts-check
/// <reference types="cypress" />

export const InventoryPage = {
  getCartBadge() {
    return cy.get('.shopping_cart_link').find('.shopping_cart_badge')
  },

  /**
   * Add the item to cart by clicking on the "Add to cart" button
   * @param {string} name Item name
   */
  addItemToCart(name) {
    cy.contains('.inventory_item', name)
      .contains('button', 'Add to cart')
      .click()
  },
}
