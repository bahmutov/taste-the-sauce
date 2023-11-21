export class InventoryPage {
  constructor() {}
  addToCart(nthItem: number) {
    //reads the name of the item
    cy.get('.inventory_item_name')
      .eq(nthItem - 1)
      .then((product) => {
        let prodText = product.text()
        cy.log(prodText)
        //clicks on the "add to cart" button of that item
        cy.get('button.btn_primary.btn_inventory')
          .should('have.length', 6)
          .eq(nthItem - 1)
          .click()
        //go to cart
        cy.get('a.shopping_cart_link').click()
        //take the name of cart item
        cy.get('.inventory_item_name').then((product) => {
          let cartItemName = product.text()
          cy.log(cartItemName)
          cy.wrap(prodText === cartItemName).should('be.true')
        })
      })
  }
  goToCart() {
    cy.get('a.shopping_cart_link').click()
  }
}
