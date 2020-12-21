/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/orders/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/orders/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"

import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"



describe('Create a cart using a Post statement', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../fixtures/buyer/umbraco/buyer')
  var adminData = require('../../fixtures/admin/admin')
  var passwordData = require('../../fixtures/password/standardPassword')
  var productData = require('../../fixtures/products/partialRefund')

  it('Create a cart using a Post Statment, Checkout, Partial Refund', () => {
    
    //Get Product Info

    const partialRefundProductQuery = "select sp.* from dbo.storeprice sp INNER JOIN dbo.seller s on sp.sellerid = s.SellerId INNER JOIN PDT.ProductCondition pc on PC.ProductConditionId = sp.StoreProductConditionID INNER JOIN PDT.Product p on p.ProductId = PC.ProductId where s.sellerid = "+Cypress.env("sellerId")+" and sp.StoreProductConditionId = "+productData.partialRefundSkuId
    const partialRefundProductFile = "cypress/fixtures/filesDuringTestRun/partialRefundProduct.json"
    databaseQueryFunctions.queryDBWriteToFile(partialRefundProductQuery, partialRefundProductFile)
    //const state = (readFile[4])

    createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6, productData.partialRefundSkuId)
    umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
    cy.setCookie('InContext_'+Cypress.env("sellerKey")+'_AWS' + Cypress.env("envUpper"), 'SellerId='+Cypress.env("sellerId")+'&SellerKey='+Cypress.env("sellerKey")+'&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })
    
    //Shopping Cart Page
    umbracoShoppingCart.verifyPackageDetails(productData.productName, productData.categoryName, productData.rarity, productData.conditionName)
    //umbracoShoppingCart.verifyOrderSummary()
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
   
    //Checkout Page
    cy.get('#btnCheckout1').click()
    cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
    shoppingCartReviewPage.checkoutWithMasterCard()
   


    //To create URL for Partial Refund pageand visit the page
    cy.get('strong > :nth-child(2) > a'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
    cy.get('strong > :nth-child(2) > a').then(completedOrder => {
      const orderNumber = completedOrder.text()
      cy.log(orderNumber)
      admin.headlessLoginAdminSite((Cypress.env("sellerEmail")), passwordData.password)
      cy.log(Cypress.env("partialRefundPageUrl1"))
      cy.log(Cypress.env("partialRefundPageUrl2"))
      const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
      const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
      cy.log(partialRefundPageUrl1)
      cy.log(partialRefundPageUrl2)
      cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
      admin.verifySellerLogin()
      
      //process partial refund
      cy.get('#Message').type("Automation Test: Cancel" + orderNumber)
      PartialRefundPage.enterPartialRefundDetails()
      PartialRefundPage.clickPartialRefundButton()

      //Verify UI items on page after partial refund
      VerifyPartialRefund.verifyPartialRefundNote()
      VerifyPartialRefund.verifyPartialRefundButton()

   })
  })

})



