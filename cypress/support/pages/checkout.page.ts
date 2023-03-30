export const CheckoutPage = {
  selectors: {
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
  },

  /**
   * Fills the checkout form with provided or default values.
   * @param firstName First name, default "Joe"
   * @param lastName Last name, default "Smith"
   * @param zipCode Zip code, default "90210"
   * @example
   *  import { CheckoutPage } from './checkout.page'
   *  CheckoutPage.fillInformationForm().submit()
   * @example
   *  // fill with your own information
   *  CheckoutPage
   *    .fillInformationForm('Mary', 'Brave', '01380')
   *    .submit()
   */
  fillInformationForm(
    firstName = 'Joe',
    lastName = 'Smith',
    zipCode = '90210',
  ) {
    // make sure to return the command chain
    // to allow chaining more assertions and commands
    return cy.get('.checkout_info_wrapper form').fillForm({
      [CheckoutPage.selectors.firstName]: firstName,
      [CheckoutPage.selectors.lastName]: lastName,
      [CheckoutPage.selectors.postalCode]: zipCode,
    })
  },
} as const
