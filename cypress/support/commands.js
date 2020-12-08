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

import 'cypress-iframe';
import 'cypress-wait-until';


Cypress.Commands.add("adminLogin", (email, password) => {
    cy.get("#UserName").clear().type(email) //Enter UserId
    cy.get("#Password").clear().type(password)  //Enter Password
    cy.get("#logonButton").click() //click Sign In button
    cy.wait(5000)  //Probably can remove later
})

Cypress.Commands.add("verifyAdminLogin", (email) => {
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
      const LoggedInUser = $Loggedin.text()
      expect(LoggedInUser).to.contain(email)
})
})

Cypress.Commands.add("enterMessage", (note) => {
    cy.xpath('//textarea[@id="Message"]').type(note)
})

Cypress.Commands.add("verifyRefundOriginAdmin", ()  => {
    cy.get("#refundOrigin").contains('CSR Initiated').should('have.selected','selected')  //CSR Initiated is selected
    cy.get("#refundOrigin").contains('Buyer Initiated').should('have.value','2')  
    cy.get("#refundOrigin").contains('Seller Initiated').should('have.value','1')
    cy.get("#refundOrigin").contains('CSR Initiated').should('have.value','0')
    cy.get('#refundOrigin').select('Buyer Initiated').should('have.value','2')  //select Buyer Initiated
})

Cypress.Commands.add("verifyRefundReason", ()  => {
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
})
 

Cypress.Commands.add("verifyInventoryChange", ()  => {
     cy.get('#inventoryChanges').contains('Do Not Adjust Inventory').should('have.selected','selected').should('have.value','False')  //Do Not Adjust Inventory is selected
     cy.get('#inventoryChanges').select('Adjust Inventory').should('have.value','True')   //select Adjust Inventor
})



    


//Needs to be updated.  THis is the example from the class
Cypress.Commands.add("adminHeadlessAuthentication", () => {

    const userCredentials = "UserName=admin%40auto.com&Password=P%40ssw0rd%21&CaptchaToken=03AGdBq26RRRLCQec6qg4S7HXovbYIr3OJ484YjRQvxKsAym2ncIZfI1IX6_KeHEhaKGKEExT5xDi0_GG7ZhvzePtObhGa6aZjkd1QG4J6_ch7vYl5bi--hLHYK9JTx39TTHxo8f9jl6W1NhSa0Zzhdvl4CvxPK9CUxcRUId2YqtC7uMJvRt8_6rfUN6L_qST0S76DLjKDqtrK9M4jjdBqSSTrVrBxc2N2MLf7m8nAvvpliLfZ6I-VGyazpxIuhpCoyWRbjyWoU8mgAz465K_hjGO3bnyBwGv-OR411RdjkCVAl78wuxILYk6Q_-0I_DrH9x3D5oSJqK6_CmLiLl_jV3ePbz-Q4cUWGLb8Bgpmr7l3b7ei86i8rsk5hfuF7Yzubsz85bvSkQ2PUD6Js8hwBWxZet-Z-sByVU6xj49ztMSiwKlQF4ejynrPHLIsGvQ_2GPLQjixaBCs&RequireCaptcha=false"
    
    cy.request('POST', 'https://store.tcgplayer-qa.com/admin/Account/LogOn', userCredentials)
        .its('body').then( body => {
            const token = body.user.token
            cy.wrap(token).as('token')
            cy.visit('https://store.tcgplayer-qa.com/admin/Home/AdminIndex', {
                onBeforeLoad (win){
                    win.localStorage.setItem('jwtToken', token)
                }
            })

        
    })


//found on https://github.com/cypress-io/cypress/issues/944
    Cypress.Commands.add('forceVisit', url => {
        cy.window().then(win => {
            return win.open(url, '_self'); 
          });
    });
    
})
