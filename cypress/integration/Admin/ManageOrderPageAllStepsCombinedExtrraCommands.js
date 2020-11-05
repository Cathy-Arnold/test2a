/// <reference types="cypress" />

describe('Refund Partial', () => {
  
    var data=require('../../fixtures/Admin')
    
    it('Opens the Admin Login Page', () => {
      cy.visit(data.AdminURL)
      cy.title().should('eq','TCGplayer.com Seller Control Panel - Login/Register')
      cy.AdminLogin (data.email, data.password)
      cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
      const LoggedInUser = $Loggedin.text()
      expect(LoggedInUser).to.contain(data.email)
      cy.visit(data.ManageOrderPageURL)
    
      //click Partial Refund button
      cy.get("#rightSide > div > div:nth-child(5) > div:nth-child(1) > div > div.widget-content > div:nth-child(2) > div > ul > li:nth-child(2) > a > span").click() 
      //Enter Refund Cancellation message
      cy.xpath('//textarea[@id="Message"]').type('Cypress Test')   //double quotes need to be around attibute value
      
      //Verify Cancellation Refund Dropdowns
      cy.VerifyCancellationRefundDropdowns()
      


      })
    })
      


    })
  