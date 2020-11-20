export class ShoppingcartReviewPage {

  checkoutWithMasterCard() {
    cy.get('[value="Mastercard"]').click()
    cy.iframe('#braintree-hosted-field-number').find('#credit-card-number').type(Cypress.env("masterCardNumber"))
    cy.iframe('#braintree-hosted-field-expirationMonth').find('#expiration-month').select(Cypress.env("masterCardExpirationMonth"))
    cy.iframe('#braintree-hosted-field-expirationYear').find('#expiration-year').select(Cypress.env("masterCardExpirationYear"))
    cy.iframe('#braintree-hosted-field-cvv').find('#cvv').type(Cypress.env("masterCardCvvCode"))
    cy.xpath('//input[@id="SaveToVault"]').click()
    //cy.xpath('//button[@id="SubmitOrderTop"]').click()
  }

}

export const shoppingCartReviewPage = new ShoppingcartReviewPage()

