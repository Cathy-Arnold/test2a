/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../../support/page_objects/umbraco/umbracoShoppingCart"

import { partialRefundPageFunctions, assert } from "../../../support/page_objects/admin/orders/refund/partialRefund"
import { verifyPartialRefundItems } from "../../../support/page_objects/admin/orders/manageOrderPage/refundRelated/refund"
import { admin } from "../../../support/page_objects/admin/adminFunctions"
import { internalApiJobs } from "../../../support/page_objects/admin/adminSettings/internalApi/internalApiJobs"
import { manageOrderPage } from "../../../support/page_objects/admin/orders/manageOrderPage/manageOrderPage"

//import { databaseQueryFunctions } from "../../support/page_objects/databaseQueries/databaseQueryFunctions"
import { refundQueries } from "../../../support/page_objects/databaseQueries/refund/refundQueries"
import { shoppingCartQueries } from "../../../support/page_objects/databaseQueries/umbracoShoppingCart/shoppingCartQueries"



describe('Partial Refund for an Umbraco order', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../../fixtures/buyer/umbraco/buyer')
  var adminData = require('../../../fixtures/admin/admin')
  var passwordData = require('../../../fixtures/password/standardPassword')
  var productData = require('../../../fixtures/products/partialRefund')

  it('Partial Refund for an Umbraco order', () => {

    //Setup prior to test
    //Seller set up
    refundQueries.isPayNowEnabled(Cypress.env("sellerId"))
    refundQueries.dailyRefundCountZero(Cypress.env("sellerId"))
    refundQueries.setExpeditedShippingAmount(Cypress.env("sellerId"), Cypress.env("expeditedShipping"))
    refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 0)
    refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 1)

    //Calculations needed to confirm refund later
    refundQueries.calculateProductTotalPrice(productData.purchasedQuantity, productData.price)
    cy.get('@productTotalPrice').then(productTotalPrice => {
      refundQueries.calculateRefundProductAmount(productTotalPrice)
    })
    refundQueries.calculateRefundShippingAmount(Cypress.env("expeditedShipping"))
    cy.get('@refundProductAmount').then(refundProductAmount => {
      cy.get('@refundShippingAmount').then(refundShippingAmount => {
        refundQueries.calculateTotalRefundAmountRequested(refundProductAmount, refundShippingAmount)
      })
    })
    refundQueries.calculateQuantityToRefund(productData.purchasedQuantity)
    refundQueries.getInventoryQuantity(productData.productConditionId)


    //Create headless cart 
    createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6, productData.productConditionId, productData.purchasedQuantity)
    umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
    cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })
    shoppingCartQueries.getExpeditedShippingSellerPriceId()
    cy.get('@expeditedShippingSellerPriceId').then(expeditedShippingSellerPriceId => {
      cy.get("#shippingOptionRadio_" + Cypress.env("sellerId") + "_" + expeditedShippingSellerPriceId).click()
    })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })
    cy.wait(5000)  //have to add wait statement to ensure checkout button is not covered by overlay
    cy.get('#btnCheckout1').click()


    //Checkout
    cy.wait(25000)  //have to add wait statement since timeout below is not working.
    cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
    shoppingCartReviewPage.checkoutWithMasterCard()
    shoppingCartReviewPage.captureOrderNumber()


    //Process Order
    admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
    cy.visit('https://store.tcgplayer-' + (Cypress.env("env")) + '.com/admin/InternalApi/StartJob')
    admin.verifyAdminLogin()
    internalApiJobs.runOrderJobs()

    //Login headlessly as seller.  Process refund
    admin.headlessLoginAdminSite((Cypress.env("sellerEmail")), passwordData.password)
    cy.get('@orderNumber').then(orderNumber => {
      manageOrderPage.visitManageOrderPage(orderNumber)
    })
    admin.verifySellerLogin()
    cy.get('@orderNumber').then(orderNumber => {
      const messageText = "Automation Test: Refund " + orderNumber
      cy.wrap(messageText).as('messageText')
    })
    cy.get('@quantityToRefund').then(quantityToRefund => {
      cy.get('@refundProductAmount').then(refundProductAmount => {
        cy.get('@refundShippingAmount').then(refundShippingAmount => {
          cy.get('@messageText').then(messageText => {
            partialRefundPageFunctions.enterPartialRefundDetails(messageText, quantityToRefund, refundProductAmount, refundShippingAmount)
          })
        })
      })
    })
    partialRefundPageFunctions.clickPartialRefundButton()

    //Verify UI items on page after partial refund
    verifyPartialRefundItems.verifyPartialRefundNote()
    verifyPartialRefundItems.verifyPartialRefundButton()
    //UI Checks
    cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
      //cy.get('@messageText').then(messageText => {
      cy.get('@refundShippingAmount').then(refundShippingAmount => {
        cy.get('@orderNumber').then(orderNumber => {
          cy.get('@refundProductAmount').then(refundProductAmount => {
            cy.get('@quantityToRefund').then(quantityToRefund => {
              refundQueries.calculateRemainingInventory(productData.quantity, quantityToRefund)
              refundQueries.calculateQuantityAfterRefund(Cypress.env("sellerId"), productData.productConditionId)
              cy.get('@remainingInventory').then(remainingInventory => {
                cy.get('@quantityAfterRefund').then(quantityAfterRefund => {
                  verifyPartialRefundItems.uIChecksAfterPartialRefund(totalRefundAmountRequested, productData.categoryName, productData.setName, productData.productName, productData.conditionName, refundShippingAmount, orderNumber, refundProductAmount, remainingInventory, quantityAfterRefund)
                  // })
                })
              })
            })
          })
        })
      })
    })



    //Verify Refund calculations
    //Get Tax applied to the order and calculate the refunded tax amount
    cy.get('@orderNumber').then(orderNumber => {
      refundQueries.getTcgTaxAmt(orderNumber)
      cy.get('@tcgTaxAmt').then(tcgTaxAmt => {
        refundQueries.calculateRefundedTax(tcgTaxAmt)
      })
      //Refund table info
      const refundTableFile = "cypress/fixtures/filesDuringTestRun/refundTablePartialRefundProStoreTcgTaxCC.json"
      refundQueries.queryRefundTable(orderNumber, refundTableFile)
      cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
        cy.get('@refundedTax').then(refundedTax => {
          refundQueries.calculateTotalRefundAmount(totalRefundAmountRequested, refundedTax)
          cy.get('@totalRefundAmount').then(totalRefundAmount => {
            cy.get('@refundShippingAmount').then(refundShippingAmount => {
              cy.get('@messageText').then(messageText => {
                assert.verifyRefundTable(refundTableFile, totalRefundAmount, refundedTax, totalRefundAmountRequested, refundShippingAmount, messageText, totalRefundAmount)
                //Fee Table Info
                const feeFile = "cypress/fixtures/filesDuringTestRun/feeTablePartialRefundProStoreTcgTaxCC.json"
                refundQueries.queryFeeTable(orderNumber, feeFile)
                cy.get('@refundProductAmount').then(refundProductAmount => {
                  refundQueries.calculateCommissionFees(refundProductAmount)
                  cy.get('@commissionFees').then(commissionFees => {
                    cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
                      cy.get('@refundedTax').then(refundedTax => {
                        refundQueries.calculateCreditCardUSFees(totalRefundAmountRequested, refundedTax)
                        cy.get('@creditCardUSFees').then(creditCardUSFees => {
                          cy.get('@refundShippingAmount').then(refundShippingAmount => {
                            refundQueries.calculateShippingFees(refundShippingAmount)
                            cy.get('@shippingFees').then(shippingFees => {
                              assert.verifyFees(feeFile, commissionFees, creditCardUSFees, shippingFees)
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

