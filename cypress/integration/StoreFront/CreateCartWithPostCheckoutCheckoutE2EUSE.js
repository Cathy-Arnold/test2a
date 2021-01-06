/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

import { partialRefundPageFunctions, verifyPartialRefundItems, assert } from "../../support/page_objects/admin/orders/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"
import { internalApiJobs } from "../../support/page_objects/admin/adminSettings/internalApiJobs"

import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"
import { refundQueries } from "../../support/page_objects/database/refundQueries"
import { shoppingCartQueries } from "../../support/page_objects/database/shoppingCartQueries"



describe('Partial Refund for an Umbraco order', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../fixtures/buyer/umbraco/buyer')
  var adminData = require('../../fixtures/admin/admin')
  var passwordData = require('../../fixtures/password/standardPassword')
  var productData = require('../../fixtures/products/partialRefund')

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



    //Create headless cart and checkout
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



    //Checkout Page: Checout
    cy.wait(25000)  //have to add wait statement since timeout below is not working.
    cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
    shoppingCartReviewPage.checkoutWithMasterCard()

    //Capture Order Number
    cy.wait(25000)  //have to add wait statement since timeout below is not working.
    cy.get('.card > :nth-child(1) > div > :nth-child(2)'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
    cy.get('strong > :nth-child(2) > a').then(completedOrder => {
      const orderNumber = completedOrder.text()
      cy.wrap(orderNumber).as('orderNumber')
    })

    //Log in as Admin headlessly and run order jobs
    const validateOrders = 'VALIDATEORDERSV2'
    const processAllFees = 'PROCESSALLFEES'
    admin.headlessLoginAdminSite(adminData.adminEmail, passwordData.password)
    cy.visit('https://store.tcgplayer-' + (Cypress.env("env")) + '.com/admin/InternalApi/StartJob')
    admin.verifyAdminLogin()
    internalApiJobs.runApiJob(validateOrders)
    internalApiJobs.runSendOrders()
    internalApiJobs.runApiJob(processAllFees)

    //Login headlessly as seller.  Process refund
    //Create URL for Partial Refund page and visit the page
    admin.headlessLoginAdminSite((Cypress.env("sellerEmail")), passwordData.password)
    const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
    const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
    cy.get('@orderNumber').then(orderNumber => {
      cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
    })
    admin.verifySellerLogin()

    //process partial refund
    //Create text for refund message
    cy.get('@orderNumber').then(orderNumber => {
      const refundText = "Automation Test: Refund " + orderNumber
      cy.wrap(refundText).as('refundText')
    })
    cy.get('@quantityToRefund').then(quantityToRefund => {
      cy.get('@refundProductAmount').then(refundProductAmount => {
        cy.get('@refundShippingAmount').then(refundShippingAmount => {
          cy.get('@refundText').then(refundText => {
            partialRefundPageFunctions.enterPartialRefundDetails(refundText, quantityToRefund, refundProductAmount, refundShippingAmount)
          })
        })
      })
    })
    partialRefundPageFunctions.clickPartialRefundButton()

    //Verify UI items on page after partial refund
    verifyPartialRefundItems.verifyPartialRefundNote()
    verifyPartialRefundItems.verifyPartialRefundButton()


    //Verify Order calculations
    //Get Tax applid to the order and calculate the refunded tax amount
    cy.get('@orderNumber').then(orderNumber => {
      refundQueries.getTcgTaxAmt(orderNumber)
      cy.get('@tcgTaxAmt').then(tcgTaxAmt => {
        cy.log("TCGTaxAmt = " + tcgTaxAmt)
      })
    })
    cy.get('@tcgTaxAmt').then(tcgTaxAmt => {
      refundQueries.calculateRefundedTax(tcgTaxAmt)
      cy.get('@refundedTax').then(refundedTax => {
        cy.log("refundedTax = " + refundedTax)
      })
    })




    //get Refund table info
    cy.get('@orderNumber').then(orderNumber => {
      const refundTableFile = "cypress/fixtures/filesDuringTestRun/refundTablePartialRefundProStoreTcgTaxCC.json"
      cy.wrap(refundTableFile).as('refundTableFile')
      refundQueries.queryRefundTable(orderNumber, refundTableFile)
    })



    cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
      cy.get('@refundedTax').then(refundedTax => {
        refundQueries.calculateTotalRefundAmount(totalRefundAmountRequested, refundedTax)
        cy.get('@totalRefundAmount').then(totalRefundAmount => {
          //4
          //cy.get('@refundedTax').then(refundedTax => {
          //cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
          cy.get('@refundShippingAmount').then(refundShippingAmount => {
            cy.get('@refundText').then(refundText => {
              ///cy.get('@totalRefundAmount').then(totalRefundAmount => {
              cy.get('@refundTableFile').then(refundTableFile => {
                assert.refundTable(refundTableFile, totalRefundAmount, refundedTax, totalRefundAmountRequested, refundShippingAmount, refundText, totalRefundAmount)
              })
            })
          })
        })
      })
      //})
      //})
      //})
    })


    //databaseQueryFunctions.queryDBWriteToFile(refundQuery, refundFile)

    // cy.readFile(refundTableFile).then((readFile) => {
    //   //OrderStatusId
    //   expect(readFile[0]).to.eql(3)
    //   //SellerOrderStatusId
    //   expect(readFile[1]).to.eql(13)
    //   //RefundTypeId
    //   expect(readFile[2]).to.eql(2)
    //   //RefundStatusId
    //   expect(readFile[3]).to.eql(2)
    //   //totalRefundAmount
    //   cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
    //     cy.get('@refundedTax').then(refundedTax => {
    //       refundQueries.calculateTotalRefundAmount(totalRefundAmountRequested, refundedTax)
    //       cy.get('@totalRefundAmount').then(totalRefundAmount => {
    //         cy.log('totalRefundAmount')
    //         expect(readFile[4]).to.eql(totalRefundAmount)
    //       })
    //     })
    //   })
    //   //VendorSalesTaxAmt
    //   expect(readFile[5]).to.eql('0.00')
    //   //refundedTax
    //   cy.get('@refundedTax').then(refundedTax => {
    //     expect(readFile[6]).to.eql(refundedTax)
    //   })
    //   //RequestedAmt
    //   cy.log('totalRefundAmountRequested')
    //   cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
    //     expect(readFile[7]).to.eql(totalRefundAmountRequested)
    //   })
    //   //refundShippingAmount
    //   cy.log('refundShippingAmount')
    //   cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //     expect(readFile[8]).to.eql(refundShippingAmount)
    //   })
    //   //CancellationReason
    //   cy.log('CancellationReason')
    //   cy.get('@refundText').then(refundText => {
    //     expect(readFile[9]).to.eql(refundText)
    //   })
    //   //  //IsTransactionProcessed
    //   //expect(readFile[10]).to.eql('false')
    //   //TotalAmtAfterStoreCredit
    //   cy.get('@totalRefundAmount').then(totalRefundAmount => {
    //     expect(readFile[11]).to.eql(totalRefundAmount)
    //   })
    // })



    //verifyPartialRefundItems.verifyPartialRefundSection()

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


    cy.get('@quantityToRefund').then(quantityToRefund => {
      refundQueries.calculateRemainingInventory(productData.quantity, quantityToRefund)
      refundQueries.calculateQuantityAfterRefund(Cypress.env("sellerId"), productData.productConditionId)
      cy.get('@remainingInventory').then(remainingInventory => {
        cy.get('@quantityAfterRefund').then(quantityAfterRefund => {
          expect(remainingInventory).to.eql(quantityAfterRefund)
        })
      })
    })





    //verifying fees
    cy.get('@orderNumber').then(orderNumber => {
      const feeQuery = ("Select sof.amt "
        + " from dbo.SellerOrderFee sof  "
        + "Inner Join dbo.SellerOrder so on sof.SellerOrderId = so.SellerOrderId "
        + "Inner Join dbo.FeeType f on sof.FeeTypeId = f.FeeTypeId "
        + "Where so.OrderNumber = '" + orderNumber + "' "
        + "and sof.RateProcessingTypeId = 2 "
        + "Order by f.Name")
      const feeFile = "cypress/fixtures/filesDuringTestRun/feeTablePartialRefundProStoreTcgTaxCC.json"
      databaseQueryFunctions.queryDBWriteToFile(feeQuery, feeFile)

      cy.readFile(feeFile).then((readFile) => {
        cy.get('@refundProductAmount').then(refundProductAmount => {
          refundQueries.calculateCommissionFees(refundProductAmount)
          cy.get('@commissionFees').then(commissionFees => {
            cy.log("commissionFees = " + commissionFees)
            expect(readFile[0].[0]).to.eql(commissionFees)
          })
        })
        cy.get('@totalRefundAmountRequested').then(totalRefundAmountRequested => {
          cy.get('@refundedTax').then(refundedTax => {
            refundQueries.calculateCreditCardUSFees(totalRefundAmountRequested, refundedTax)
            cy.get('@creditCardUSFees').then(creditCardUSFees => {
              cy.log("CreditCardUSFees = " + creditCardUSFees)
              expect(readFile[1].[0]).to.eql(creditCardUSFees)
            })
          })
        })
        cy.get('@refundShippingAmount').then(refundShippingAmount => {
          refundQueries.calculateShippingFees(refundShippingAmount)
          cy.get('@shippingFees').then(shippingFees => {
            cy.log("ShippingFees = " + shippingFees)
            expect(readFile[2].[0]).to.eql(shippingFees)
          })
        })
      })
    })



  })
})