/// <reference types="cypress" />

describe('Product Page', () => {

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


