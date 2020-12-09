/// <reference types="cypress" />


import { admin } from "../../support/page_objects/admin/adminFunctions"





describe('Headless Authorization Admin No Cookies', () => {
    

    it('Headless Authorization Admin No Cookies', () => {
        //admin.headlessLoginAdmin() 

        cy.request({
            method: 'POST',
            url: 'https://store.tcgplayer-'+(Cypress.env("partialRefundPageUrl1"))+'.com/admin/Account/LogOn', 
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
              UserName: 'admin@auto.com',
              Password: 'P@ssw0rd!',
              RequireCaptcha: 'false',
              CaptchToken: 'literally anything'
            }
          })



        // to prove we have a session
       // cy.getCookie('cypress-session-cookie').should('exist')

        //   cy.request('POST', 'https://store.tcgplayer-qa.com/admin/Account/LogOn', userCredentials) 

  
        //     const orderNumber = 'F417072D-61071D-5622D'
        //     cy.log(Cypress.env("partialRefundPageUrl1"))
        //     cy.log(Cypress.env("partialRefundPageUrl2"))
        //     const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
        //     const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
        //     cy.log(partialRefundPageUrl1)
        //     cy.log(partialRefundPageUrl2)
        //     cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
        //     admin.verifyAdminLogin()




    })
})