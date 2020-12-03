/// <reference types="cypress" />

describe('Admin Login Headless Authorization By Creating Cookie. Not using any Post at this time. Verify login and access the Partial refund page.', () => {
  
  //var data=require('../../fixtures/Admin')
  
it('Admin Login Headless Authorization by creating cookie.  THen verify login.', ()  => {
  cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueAdmin"), {httpOnly: true}) 
  cy.visit(Cypress.env("adminIndexPageUrl"))
  //Verify login
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
    const LoggedInUser = $Loggedin.text()
    cy.log(Cypress.env('adminEmail'))
    expect(LoggedInUser).to.contain(Cypress.env("adminEmail"))
    })
})


it('Opens the Manage Order Page and clicks Partial Refund button', () => {
  cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueSeller"), {httpOnly: true}) 
  cy.visit(Cypress.env("manageOrderPageUrl"))
  cy.title().should('eq','Manage Order')
  cy.contains("Partial Refund").click() //click Partial Refund button
  
  })

})
  