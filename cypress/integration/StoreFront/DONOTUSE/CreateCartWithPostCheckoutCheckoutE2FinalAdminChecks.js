/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../../support/page_objects/umbraco/umbracoShoppingCart"

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/orders/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/orders/partialRefund"
import { admin } from "../../../support/page_objects/admin/adminFunctions"
import { internalApiJobs } from "../../support/page_objects/admin/adminSettings/internalApiJobs"

import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"
import { refundQueries } from "../../support/page_objects/database/refundQueries"
import { shoppingCartQueries } from "../../support/page_objects/database/shoppingCartQueries"



describe('Create a cart using a Post statement', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../fixtures/buyer/umbraco/buyer')
  var adminData = require('../../fixtures/admin/admin')
  var passwordData = require('../../fixtures/password/standardPassword')
  var productData = require('../../fixtures/products/partialRefund')

  it('Create a cart using a Post Statment, Checkout, Partial Refund', () => {

    //Setup prior to test
    //Seller set up
    // refundQueries.isPayNowEnabled(Cypress.env("sellerId"))
    // refundQueries.dailyRefundCountZero(Cypress.env("sellerId"))
    // refundQueries.setExpeditedShippingAmount(Cypress.env("sellerId"), Cypress.env("expeditedShipping"))
    // refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 0)
    // refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 1)


    // //Calculations needed to confirm refund
    // //Calculate Product Total Price
    // refundQueries.calculateProductTotalPrice(productData.purchasedQuantity, productData.price)
    // cy.get('@productTotalPrice').then(productTotalPrice => {
    //   cy.log("Product Total Price = " + productTotalPrice)
    //   //Calcualte Refund Product and Refund Shipping Amounts
    //   refundQueries.calculateRefundProductAmount(productTotalPrice)
    //   cy.get('@refundProductAmount').then(refundProductAmount => {
    //     cy.log("Refund Product Amount = " + refundProductAmount)
    //   })
    // })
    // refundQueries.calculateRefundShippingAmount(Cypress.env("expeditedShipping"))
    // cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //   cy.log("Refund Shipping Amount = " + refundShippingAmount)
    // })
    // //Calcualte Total Refund Amount Requested (Product + Shipping)
    // cy.get('@refundProductAmount').then(refundProductAmount => {
    //   cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //     refundQueries.calculateTotalRefundAmountRequested(refundProductAmount, refundShippingAmount)
    //   })
    // })
    // cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
    //   cy.log("Total Refund Amount Requested = " + totalRefundAmountRequested)
    // })
    // //Calculate Product Quantity to Refund
    // refundQueries.calculateQuantityToRefund(productData.purchasedQuantity)
    // cy.get('@quantityToRefund').then(quantityToRefund => {
    //   cy.log("Product Quantity to Refund = " + quantityToRefund)
    // })


    // refundQueries.getInventoryQuantity(productData.productConditionId)
    // cy.get('@sellerInventoryQuantity').then(sellerInventoryQuantity => {
    //   cy.log("Seller Inventory Quantity = " + sellerInventoryQuantity)
    // })


    // //Create headless cart and checkout
    // createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6, productData.productConditionId, productData.purchasedQuantity)
    // umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
    // cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })








    // //Shopping Cart Page

    // shoppingCartQueries.getCartItemId(buyerData.buyerEmail6)
    // cy.get('@cartItemId').then(cartItemId => {
    //   cy.log("CartItemId = " + cartItemId)
    //   shoppingCartQueries.getExpeditedShippingSellerPriceId()
    //   cy.get('@expeditedShippingSellerPriceId').then(expeditedShippingSellerPriceId => {
    //     cy.log("ExpeditedShippingSellerPriceId = " + expeditedShippingSellerPriceId)
    //     cy.get('@productTotalPrice').then(productTotalPrice => {
    //       cy.log("Product Total Price = " + productTotalPrice)


    //       // //Verify Package Details
    //       // cy.get('@sellerInventoryQuantity').then(sellerInventoryQuantity => {
    //       //   cy.log("Seller Inventory Quantity = " + sellerInventoryQuantity)
    //       //   cy.log("Verifing Package Details")
    //       //   umbracoShoppingCart.verifyPackageDetails(productData.productName, productData.setName, productData.categoryName, productData.rarity, productData.conditionName, productData.price, productData.purchasedQuantity, sellerInventoryQuantity)
    //       // })


    //       // //Verify Order Summary
    //       // cy.log("Verifing Order Summary")
    //       // umbracoShoppingCart.verifyOrderSummary(productData.purchasedQuantity, productTotalPrice, expeditedShippingSellerPriceId, Cypress.env("expeditedShipping"))


    //       //Click Expedited Checkout
    //       cy.get("#shippingOptionRadio_" + Cypress.env("sellerId") + "_" + expeditedShippingSellerPriceId).click()

    //     })
    //   })
    // })



    // cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    // cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })


    // cy.get('#btnCheckout1').click()
    // //Checkout Page
    // cy.wait(25000)  //have to add wait statemtn since timeout below is not working.
    // cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
    // shoppingCartReviewPage.checkoutWithMasterCard()

    // // //Capture ordernumber
    // cy.wait(25000)  //have to add wait statemtn since timeout below is not working.
    // //cy.get('strong > :nth-child(2) > a'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
    // cy.get('.card > :nth-child(1) > div > :nth-child(2)'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
    // cy.get('strong > :nth-child(2) > a').then(completedOrder => {
    //   const orderNumber = completedOrder.text()
    //   cy.wrap(orderNumber).as('orderNumber')
    //   cy.log(orderNumber)
    // })

    // //Log in as Admin headlessly and run order jobs
    // const validateOrders = 'VALIDATEORDERSV2'
    // const processAllFees = 'PROCESSALLFEES'
    // admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
    // cy.visit('https://store.tcgplayer-' + (Cypress.env("env")) + '.com/admin/InternalApi/StartJob')
    // admin.verifyAdminLogin()
    // internalApiJobs.runApiJob(validateOrders)
    // internalApiJobs.runSendOrders()
    // internalApiJobs.runApiJob(processAllFees)

    //Login headlessly as seller.  Process refund
    //Create URL for Partial Refund page and visit the page



    const refundText = "Automation Test: Refund F417072D-5F1AD4-5BA3D"
    cy.wrap(refundText).as('refundText')
    cy.log(refundText)

    const orderNumber = "F417072D-5F1AD4-5BA3D"
    cy.wrap(orderNumber).as('orderNumber')
    cy.log(orderNumber)



    admin.headlessLoginAdminSite((Cypress.env("sellerEmail")), passwordData.password)
    const manageOrderPage = (Cypress.env("manageOrderPage"))

    cy.get('@orderNumber').then(orderNumber => {
      cy.log("Order Number = " + orderNumber)
      cy.visit(manageOrderPage + orderNumber)
    })
    admin.verifySellerLogin()



    // cy.get('@orderNumber').then(orderNumber => {
    //   refundQueries.getSellerProductCode (orderNumber)
    //   cy.get('@sellerProductCode')
    //   //Add code to check if null.  If not then verify on UI
    //   //SellerProductCode
    //   ////cy.get('GET THIS FOR A MP REFUND').should('be.visible')
    //    })


    cy.get(':nth-child(9) > .widget > .title > h6').contains('Refunds')
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(1)').contains('Date')
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(2)').contains('Type')
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(2)').contains('Partial')
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(3)').contains('Amount')


    //cy.get('@refundProductAmount').then(refundProductAmount => {
    //cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(3)').contains(refundProductAmount)
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(3)').contains('62.00')
    // })


    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(1) > tr > :nth-child(4)').contains('Refund Origin')
    cy.get(':nth-child(9) > .widget > :nth-child(2) > .dataTables_wrapper > .display > :nth-child(2) > .gradeA > :nth-child(4)').contains('Buyer Initiated')
    cy.get(':nth-child(1) > tr > :nth-child(5)').contains('Refund Reason')
    cy.get('.gradeA > :nth-child(5)').contains('Product - Inventory Issue')


    cy.get(':nth-child(1) > tr > :nth-child(6)').contains('Detail')
    cy.get(':nth-child(6) > table > thead > tr > :nth-child(1)').contains('ID')
    //placeholder for produict ID for MP refunds (Need to add actyal code)
    cy.get(':nth-child(6) > table > tbody > tr > :nth-child(2)').contains(productData.categoryName + " - " + productData.setName + " - " + productData.productName + " - " + productData.conditionName)

    //cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //cy.get(':nth-child(6) > div > span').contains("Refunded Shipping Cost: $"+refundShippingAmount)
    cy.get(':nth-child(6) > div > span').contains("Refunded Shipping Cost: $3.50")
    //})

    cy.get('@orderNumber').then(orderNumber => {
      cy.get(':nth-child(6) > :nth-child(3)').contains("Refund Reason: Automation Test: Refund " + orderNumber)
    })

    cy.get('.refundedQuantityHeader').contains('Refunded Qty')
    cy.get('tr > :nth-child(3) > span').contains('0')



    cy.get(':nth-child(6) > table > thead > tr > :nth-child(4)').contains('Refunded Amount')
    //cy.get('@refundProductAmount').then(refundProductAmount => {
    //cy.get(':nth-child(6) > :nth-child(3)').contains("$"+refundProductAmount)
    cy.get(':nth-child(6) > table > tbody > tr > :nth-child(4)').contains("$58.50")
    //})


    cy.get('@refundProductAmount').then(refundProductAmount => {
      refundQueries.calculateRemainingInventory(productData.quantity, refundProductAmount)
      refundQueries.calculateQuantityAfterRefund(Cypress.env("sellerId"), productData.productConditionId)
      cy.get('@remainingInventory').then(remainingInventory => {
        cy.get('@quantityAfterRefund').then(quantityAfterRefund => {
          expect(remainingInventory.to.eql(quantityAfterRefund))
        })
      })
    })



  })
})


