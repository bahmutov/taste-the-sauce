export const InventoryPage = {
  getCartBadge() {
    return cy.get('.shopping_cart_badge')
  },
  addItemToCart(itemName: string) {
    cy.contains('.inventory_item', itemName).within(() => {
      cy.contains('button', 'Add to cart').click()
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove').should('be.visible')
    })
  },
}
