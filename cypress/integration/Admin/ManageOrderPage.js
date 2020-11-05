/// <reference types="cypress" />

describe('Refund Partial', () => {
  
    var data=require('../../fixtures/Admin')
    
    it('Opens the Admin Login Page', () => {
      cy.visit(data.AdminURL)
      cy.title().should('eq','TCGplayer.com Seller Control Panel - Login/Register')
      })
  
   
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
  
    it('Opens the Manage Order Page', () => {
      //cy.wait(30000)  // remove later
      cy.visit(data.ManageOrderPageURL)
      cy.wait(10000)  //remove later
      //cy.title().should('eq','Manage Order')
      })
  
   
      it('Clicks Partial Refund Button', () => {
        cy.get("#rightSide > div > div:nth-child(5) > div:nth-child(1) > div > div.widget-content > div:nth-child(2) > div > ul > li:nth-child(2) > a > span").click() //click Partial Refund button
        cy.wait(5000)  //Probably can remove later
      })
  
      
    })
  