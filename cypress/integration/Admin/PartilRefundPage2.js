/// <reference types="cypress" />

describe('Refund Partial', () => {
  
    var data=require('../../fixtures/Admin')
  
  
    it('Opens the Partial Refund Page URL', () => {
      
      cy.visit(data.PartialRefundPageURL)
     //cy.title().should('eq','Manage Order')
      })
    
    //it('Opens the Admin Login Page', () => {
      //cy.visit(data.AdminURL)
     // cy.title().should('eq','TCGplayer.com Seller Control Panel - Login/Register')
      //})
  
   
      it('Admin Login', ()  => {
        cy.AdminLogin (data.email, data.password)
        //cy.AdminLogin(data.email, data.password)
      })
  
      it('Verify Admin Login', () => {
        cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
        const LoggedInUser = $Loggedin.text()
        expect(LoggedInUser).to.contain(data.email)
        })
      })
  
    })
