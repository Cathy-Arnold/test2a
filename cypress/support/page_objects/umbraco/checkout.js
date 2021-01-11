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

 captureOrderNumber() {
 cy.wait(25000)  //have to add wait statement since timeout below is not working.
 cy.get('.card > :nth-child(1) > div > :nth-child(2)'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
 cy.get('strong > :nth-child(2) > a').then(completedOrder => {
   const orderNumber = completedOrder.text()
   cy.wrap(orderNumber).as('orderNumber')
 })
}

}

export const shoppingCartReviewPage = new ShoppingcartReviewPage()