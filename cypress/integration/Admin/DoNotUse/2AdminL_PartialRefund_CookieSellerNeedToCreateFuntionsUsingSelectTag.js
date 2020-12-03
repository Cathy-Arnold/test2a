/// <reference types="cypress" />

describe('Seller Login Headless Authorization By Creating Cookie. Not using any Post at this time. Verify login and access the Partial refund page. Begin Partial refund', () => {

  //var data = require('../../fixtures/Admin')

  it('Access the PartialRefundPage Start to verify the Refund Origin Dropdown', () => {
    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueSeller"), { httpOnly: true })
    cy.visit(Cypress.env("partialRefundPageUrl"))
    //Verify login
    cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
      const LoggedInUser = $Loggedin.text()
      cy.log(Cypress.env('sellerEmail'))
      expect(LoggedInUser).to.contain(Cypress.env("sellerEmail"))
    })


    //Start of refund
    cy.get('#Message').type("Automation Test: Cancel OrderNumber")  //Will replace 'OrderNumber' with a variable

    //Start of Refund Origin
    //#1
    cy.get("#refundOrigin").contains('Buyer Initiated').should('have.value', '2')
    cy.get("#refundOrigin").contains('Seller Initiated').should('have.value', '1')

    cy.get("#refundOrigin").select(['Buyer Initiated']).should('have.value', '2')
    //cy.get("#refundOrigin").select(['Buyer Initiated', 'Seller Initiated']).invoke('val').should('deep.equal', ['2', '1']) //Will only work with drop downs tha allow more than 1 selection

    //#2 Trying to loop thru like part 3 section 15.  Does not work the same with the Select tag
    const refundOrigin = {
      'Buyer Initiated': '2',
      'Seller Initiated': '1'
    }
    //   cy.get("#refundOrigin").then (refundOriginDropdown => {
    //     cy.wrap(refundOriginDropdown).select(refundOrigin)
    //     cy.get('#refundOrigin').each(listItem =>  { //this will act as a loop.  Index will equal the number of items in the drop down.
    //     //const itemText = listItem.text().trim()     //trim will remove leading and trailing spaces
    //     cy.wrap(listItem).select(listItem)
    //     cy.wrap(refundOriginDropdown).should('contain', itemText)
    //     cy.get('#refundOrigin').should('have.value','2')
    //   })
    // })  

    cy.get("#refundReason").select('Product - Inventory Issue').should('have.value', 'Product - Inventory Issue') //select Product - Inventory Issue
    cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value', 'True')   //select Adjust Inventor

  })
})
