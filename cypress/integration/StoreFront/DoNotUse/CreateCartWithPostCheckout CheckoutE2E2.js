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
  const buyerCookieName = "BuyerEmail6"

  it('Create a cart using a Post Statment', () => {
    createCart.createCartVistShoppingCartPage(buyer)
    umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    cy.setCookie('InContext_'+Cypress.env("sellerKey")+'_AWSSTG', 'SellerId=8&SellerKey='+Cypress.env("sellerKey")+'&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })   
    //Shopping Cart Page
   // umbracoShoppingCart.verifyPackageDetails()
   // umbracoShoppingCart.verifyOrderSummary()

    //Checkout Page
    cy.get('#btnCheckout1').click()
   
    //cy.visit('https://store.tcgplayer-'+Cypress.env("env")+'.com/shoppingcart/review?sf='+Cypress.env("sellerKey"))


    // //If we get logon page
    // //if (cy.get('#Email').isVisible) {
    //       cy.get('#Email').type(Cypress.env("buyerEmail6"))
    //       cy.get('#Password').type(Cypress.env("password"))
    //       cy.get('.GreenButtonNoArrow').click()
    //     //}

    //If the Confirm Address page is displayed
    cy.wait(7000)
    // cy.get('.blue-button-sm').click()

    shoppingCartReviewPage.checkoutWithMasterCard()
    cy.wait(10000)


    cy.get('strong > :nth-child(2) > a').then(completedOrder => {
      const orderNumber = completedOrder.text()
      cy.log(orderNumber)
      admin.setSellerAuthCookie()
     // cy.log(orderNumber)
      cy.log(Cypress.env("partialRefundPageUrl1"))
      cy.log(Cypress.env("partialRefundPageUrl2"))
      const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
      const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
      cy.log(partialRefundPageUrl1)
      cy.log(partialRefundPageUrl2)
      cy.visit(partialRefundPageUrl1+orderNumber+partialRefundPageUrl2)
   

   
    // const orderNumber = cy.get('strong > :nth-child(2) > a').invoke('text')
    //   cy.log(orderNumber)
 

  //  cy.get('strong > :nth-child(2) > a').then(completedOrder =>  {
  //     completedOrder.invoke('text').as('orderNumber')
  //     cy.log(orderNumber)
    
      // cy.get('strong > :nth-child(2) > a').invoke('text').as('orderNumber')
      //   cy.log(@orderNumber)




   


      // admin.verifySellerLogin()
      // cy.get('#Message').type("Automation Test: Cancel" + orderNumber)
      // PartialRefundPage.enterPartialRefundDetails()
      // // PartialRefundPage.clickPartialRefundButton()
      // // VerifyPartialRefund.verifyPartialRefundNote()
      // // VerifyPartialRefund.verifyPartialRefundButton()
    
    })
  })

})



