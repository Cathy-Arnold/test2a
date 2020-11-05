// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("AdminLogin", (email, password) => {
    cy.get("#UserName").clear().type(email) //Enter UserId
    cy.get("#Password").clear().type(password)  //Enter Password
    cy.get("#logonButton").click() //click Sign In button
    cy.wait(5000)  //Probably can remove later
})

Cypress.Commands.add("VerifyAdminLogin", (email) => {
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
      const LoggedInUser = $Loggedin.text()
      expect(LoggedInUser).to.contain(email)
})
})

Cypress.Commands.add("EnterMessage", (note) => {
    cy.xpath('//textarea[@id="Message"]').type(note)
})

Cypress.Commands.add("VerifyCancellationRefundDropdowns", ()  => {
    //Start of Refund Origin
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

