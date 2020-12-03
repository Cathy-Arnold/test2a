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
    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
  
    

    
    //cy.visit('https://store.tcgplayer-stg.com/shoppingcart/ordercomplete/14525125?sf=f417072d')
   


// //works but orderNumber is not a global variable
//     cy.get('strong > :nth-child(2) > a').then(completedOrder =>  {
const orderNumber = 'F417072D-71CF80-80FFA'
cy.log(orderNumber)
    
admin.setSellerAuthCookie()
//       //admin.visitPartialRefundPage()

      


cy.log(Cypress.env("partialRefundPageUrl1"))
cy.log(Cypress.env("partialRefundPageUrl2"))
const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
cy.log(partialRefundPageUrl1)
cy.log(partialRefundPageUrl2)
cy.visit(partialRefundPageUrl1+orderNumber+partialRefundPageUrl2)






//cy.visit(Cypress.env("2partialRefundPageUrl"))
//cy.visit('https://store.tcgplayer-stg.com/admin/orders/partialRefund/F417072D-71CF80-80FFA?sellerKey=F417072D')
//     // cy.visit("https://store.tcgplayer-stg.com/admin/orders/partialRefund/"+orderNumber)
//     cy.visit(Cypress.env("partialRefundPageUrl11"))
//     // cy.visit('(Cypress.env("partialRefundPageUrl1"))'+orderNumber)
//     //   //cy.visit((Cypress.env("partialRefundPageUrl1")+orderNumber+Cypress.env("partialRefundPageUrl2")))
//     //       // cy.visit("https://store.tcgplayer-stg.com/admin/orders/partialRefund/F417072D-BA52F5-1241F?sellerKey=F417072D")
//        })
    
//     // admin.verifySellerLogin()
//     // PartialRefundPage.enterPartialRefundDetails()
//     // PartialRefundPage.clickPartialRefundButton()
//     // VerifyPartialRefund.verifyPartialRefundNote()
//     // VerifyPartialRefund.verifyPartialRefundButton()
    

  })

})



