export class InventoryPage {
  constructor() {}
  addToCart(nthItem: number) {
    // return the entire chain of Cypress commands
    return cy
      .get('.inventory_item_name')
      .eq(nthItem - 1)
      .invoke('text')
      .then((productName) => {
        cy.get('button.btn_primary.btn_inventory')
          .eq(nthItem - 1)
          .click()
        // yield the product name
        cy.wrap(productName, { log: false })
      })
  }
  goToCart() {
    cy.get('a.shopping_cart_link').click()
    // POM methods can include assertions
    // that verify the app is working as expected
    cy.location('pathname').should('equal', '/cart.html')
  }
}
