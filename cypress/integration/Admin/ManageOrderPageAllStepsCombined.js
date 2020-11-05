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


      cy.get("#refundOrigin").contains('CSR Initiated').should('have.selected','selected')  //CSR Initiated is selected
      cy.get("#refundOrigin").contains('Buyer Initiated').should('have.value','2')  
      cy.get("#refundOrigin").contains('Seller Initiated').should('have.value','1')
      cy.get("#refundOrigin").contains('CSR Initiated').should('have.value','0')
      cy.get('#refundOrigin').select('Buyer Initiated').should('have.value','2')  //select Buyer Initiated
  
      //Start of Refund Reason
      cy.get("#refundReason").should('have.value','Select an Option')  
      cy.get("#refundReason").select('General - Buyer Safeguard').should('have.value','General - Buyer Safeguard') 
      cy.get("#refundReason").select('General - Cancellation').should('have.value','General - Cancellation') 
      cy.get("#refundReason").select('General - Fraudulent Order').should('have.value','General - Fraudulent Order')  
      cy.get("#refundReason").select('General - Verification Failure').should('have.value','General - Verification Failure') 
      cy.get("#refundReason").select('Package - Damaged').should('have.value','Package - Damaged') 
      cy.get("#refundReason").select('Package - Missing').should('have.value','Package - Missing') 
      cy.get("#refundReason").select('Package - Undeliverable').should('have.value','Package - Undeliverable') 
      cy.get("#refundReason").select('Package - Wrong Address').should('have.value','Package - Wrong Address') 
      cy.get("#refundReason").select('Product - Condition Issue').should('have.value','Product - Condition Issue') 
      cy.get("#refundReason").select('Product - Counterfeit').should('have.value','Product - Counterfeit') 
      cy.get("#refundReason").select('Product - Inventory Issue').should('have.value','Product - Inventory Issue') //select Product - Inventory Issue
  
  
       //Start of Inventory Changes
       cy.get('#inventoryChanges').contains('Do Not Adjust Inventory').should('have.selected','selected').should('have.value','False')  //Do Not Adjust Inventory is selected
       cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value','True')   //select Adjust Inventory
  
       })
    
      })
  })
  