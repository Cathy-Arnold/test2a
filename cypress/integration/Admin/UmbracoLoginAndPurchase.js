/// <reference types="cypress" />

describe('Umbraco Login Test', () => {

    
    var data=require('../../fixtures/QA')

    it('Open Umbraco', () => {
      cy.visit(data.UmbracoLoginURL)
      })
 
    
  
    it('Login', () => {
      //cy.wait(5000)  
      //cy.get("#aux-nav__toggle-title--default").click()  //click Sign In button
      //cy.get("body > div.page-container > header.site-header.site-header--default > div.container-fluid.site-header__top.site-header__top--default > div > div.col-xs-12.col-md-4.col-lg-3 > div > div.btn-group.btn-group-dropdown.open > ul > li:nth-child(1) > a").click()  //Click "Sign in with TCGplayer"
      cy.wait(5000)
      cy.get("#Email").clear().type(data.email) //Enter UserId
      cy.get("#Password").clear().type(data.password)  //Enter Password
      cy.get("#login-button").click() //click Sign In button
      cy.wait(60000)
      })

    it('Open Umbraco', () => {
      cy.visit('http://abpcards.umbracoqa.com/catalog/magic/theros/thoughtseize')
      })
 
    
  
    it('Product Page Dropdown', () => {
      cy.wait(5000)  
      cy.url().should('include','thoughtseize')  //verify URL contains a keyword
      cy.get("body > div.page-container > section > div > div > div.row > div.col-xs-12.col-sm-9.col-md-10 > div > div > div.product__action-panel > div > div.col-xs-9.col-sm-5.col-md-4 > div > select").select("5").should('have.value','5') //select quantity and verify correct quantity was selected
      cy.get("body > div.page-container > section > div > div > div.row > div.col-xs-12.col-sm-9.col-md-10 > div > div > div.product__action-panel > div > div.col-xs-3.col-sm-4.col-md-3 > button").click()  //click Add to Cart
      //Does not like the option for using class
      //cy.get('.product__add-to-cart btn btn-primary btn-block').click()   //click Add to Cart

      cy.get("#product__modal > div > div > div.modal-header.product__modal-header > a > span").click() //Click View Cart and Checkout
    })
  })
