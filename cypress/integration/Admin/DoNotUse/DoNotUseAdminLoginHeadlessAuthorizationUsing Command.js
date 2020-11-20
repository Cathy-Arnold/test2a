/// <reference types="cypress" />

describe('Login Headless Authorization', () => {
  
  var data=require('../../fixtures/Admin')
   
it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  cy.AdminHeadlessAuthentication()  
  })      
  
it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  cy.AdminHeadlessAuthentication()  
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
    const LoggedInUser = $Loggedin.text()
    expect(LoggedInUser).to.contain(data.email)  
    })
})

it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  cy.AdminHeadlessAuthentication()    
  cy.visit("https://store.tcgplayer-qa.com/admin/orders/OrderList")
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
    const LoggedInUser = $Loggedin.text()
    expect(LoggedInUser).to.contain(data.email)  
    })
})

})
  