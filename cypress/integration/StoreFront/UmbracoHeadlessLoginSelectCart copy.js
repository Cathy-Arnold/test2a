/// <reference types="cypress" />

describe('Login to Umbraco with Headless Authorization, select items, go to cart', () => {

    it('Login to Umbraco with Headless Authorization', () => {
      cy.visit('http://abpcards.umbracoqa.com/catalog/magic/theros/thoughtseize', {
            onBeforeLoad (win){
                win.localStorage.setItem('jwtToken', token)
            
                
            } 
        })
    })

    it('Product Page Dropdown and select items', () => {
        cy.wait(5000)  
        cy.url().should('include','thoughtseize')  //verify URL contains a keyword
        cy.get("body > div.page-container > section > div > div > div.row > div.col-xs-12.col-sm-9.col-md-10 > div > div > div.product__action-panel > div > div.col-xs-9.col-sm-5.col-md-4 > div > select").select("5").should('have.value','5') //select quantity and verify correct quantity was selected
        cy.get("body > div.page-container > section > div > div > div.row > div.col-xs-12.col-sm-9.col-md-10 > div > div > div.product__action-panel > div > div.col-xs-3.col-sm-4.col-md-3 > button").click()  //click Add to Cart
        //Does not like the option for using class
        //cy.get('.product__add-to-cart btn btn-primary btn-block').click()   //click Add to Cart
        //cy.get('.product__add-to-cart').click()   //click Add to Cart
        cy.contains('Continue shopping').click()
        cy.wait(15000) 
        //cy.get("#product__modal > div > div > div.modal-header.product__modal-header > a > span").click() //Click View Cart and Checkout
    })


    it('Go to cart page', () => {
        cy.visit('https://cart.tcgplayer-qa.com/shoppingcart?sf=6d9fccfa&ck=5f9c7c91369d4205a9ae50fb8982291d')
        })

})

