// @ts-check
/// <reference types="cypress" />

type SortOrder = 'lohi' | 'hilo' | 'az' | 'za'

export const InventoryPage = {
  getCartBadge() {
    return cy.get('.shopping_cart_link').find('.shopping_cart_badge')
  },

  /**
   * Add the item to cart by clicking on the "Add to cart" button
   * @param name Item name
   */
  addItemToCart(name: string) {
    cy.contains('.inventory_item', name)
      .contains('button', 'Add to cart')
      .click()
  },

  /**
   * Sorts inventory by the given sort order
   */
  selectSort(sortOrder: SortOrder) {
    expect(sortOrder, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    // find the sort dropdown and select the low to high value
    // https://on.cypress.io/select
    // Tip: inspect the HTML markup around the sort element
    cy.getByTest('product_sort_container').select(sortOrder)
  },

  /**
   * Confirms the inventory items were sorted on the page
   * What gets sorted depends on the sort order (text or price)
   */
  confirmSorted(sortOrder: SortOrder) {
    const assertion =
      sortOrder === 'lohi' || sortOrder === 'az'
        ? 'be.ascending'
        : 'be.descending'

    if (sortOrder === 'lohi' || sortOrder === 'hilo') {
      // find all price elements and map them to numbers
      // following the "Lesson 02" solution
      // Tip: use cypress-map queries
      cy.get('.inventory_item_price')
        .map('innerText')
        .mapInvoke('slice', 1)
        .map(Number)
        .print('sorted prices %o')
        // confirm the list of numbers is sorted
        // https://www.chaijs.com/plugins/chai-sorted/
        .should(assertion)
    } else {
      // items should be sorted by name
      cy.get('.inventory_item_name')
        .map('innerText')
        .print('sorted names %o')
        .should(assertion)
    }
  },
}
