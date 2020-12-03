export class ShoppingcartReviewPage {

  checkoutWithMasterCard() {
    cy.fixture('creditCard/masterCard/refunds/masterCard').then(function (data) {
      this.data = data
      cy.get('[value="Mastercard"]').click()
      cy.iframe('#braintree-hosted-field-number').find('#credit-card-number').type(this.data.cardNumber)
      cy.iframe('#braintree-hosted-field-expirationMonth').find('#expiration-month').select(this.data.expirationMonth)
      cy.iframe('#braintree-hosted-field-expirationYear').find('#expiration-year').select(this.data.expirationYear)
      cy.iframe('#braintree-hosted-field-cvv').find('#cvv').type(this.data.cvvCode)
      cy.xpath('//input[@id="SaveToVault"]').click()
      cy.xpath('//button[@id="SubmitOrderTop"]').click()
    })

  }
}

export const shoppingCartReviewPage = new ShoppingcartReviewPage()