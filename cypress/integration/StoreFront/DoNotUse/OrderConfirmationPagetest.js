/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"



describe('Create a cart using a Post statement', () => {

  const buyer = "buyerEmail6"

  it('Create a cart using a Post Statment', () => {
    createCart.createCartVistChoppingCartPage(buyer)

    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
  
    


    cy.visit('https://store.tcgplayer-stg.com/shoppingcart/ordercomplete/14525124?sf=f417072d')


// //works but orderNumber is not a global variable
//     cy.get('strong > :nth-child(2) > a').then(completedOrder =>  {
//       const orderNumber = completedOrder.text()
//       cy.log(orderNumber)
//     })

    cy.get('strong > :nth-child(2) > a').invoke('text').as('orderNumber')
        cy.log('@orderNumber')
    
  
  
 // cy.get('strong > :nth-child(2) > a').text().as('orderNumber')
    //   
    //   completedOrder.text().as('orderNumber')
   // cy.log(@orderNumber)
    // })

    //cy.writeFile('cypress/fixtures/cartKey.json', response.body.results[0].cartKey)
          
      
      // cy.writeFile('cypress/fixtures/cartKey.json', response.body.results[0])
      // const cartKey = cy.readFile('cypress/fixtures/cartKey.json').its('cartKey').should('eq',"6573d4d1289743178d251d1a530a56af")


      admin.setSellerAuthCookie()
      admin.visitPartialRefundPage()


      cy.visit(Cypress.env("partialRefundPageUrl1")+('@orderNumber')+Cypress.env("partialRefundPageUrl2"))
          // cy.visit("https://store.tcgplayer-stg.com/admin/orders/partialRefund/F417072D-BA52F5-1241F?sellerKey=F417072D")
    
    admin.verifySellerLogin()
    PartialRefundPage.enterPartialRefundDetails()
    PartialRefundPage.clickPartialRefundButton()
    VerifyPartialRefund.verifyPartialRefundNote()
    VerifyPartialRefund.verifyPartialRefundButton()
    

  })

})



