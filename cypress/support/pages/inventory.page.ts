export class InventoryPage {
  constructor() {}
  addToCart(nthItem: number) {
    // stores the item name in the alias "itemName"
    cy.get('.inventory_item_name')
      .eq(nthItem - 1)
      .invoke('text')
      .as('itemName')

    cy.get('button.btn_primary.btn_inventory')
      .eq(nthItem - 1)
      .click()
  }
  goToCart() {
    cy.get('a.shopping_cart_link').click()
    // POM methods can include assertions
    // that verify the app is working as expected
    cy.location('pathname').should('equal', '/cart.html')
  }
}
