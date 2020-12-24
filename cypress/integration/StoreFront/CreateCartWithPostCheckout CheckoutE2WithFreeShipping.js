/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/orders/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/orders/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"
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
    refundQueries.isPayNowEnabled(Cypress.env("sellerId"))
    refundQueries.dailyRefundCountZero(Cypress.env("sellerId"))
    refundQueries.setExpeditedShippingAmount(Cypress.env("sellerId"), Cypress.env("expeditedShipping"))
    refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 0)
    refundQueries.updateInventory(Cypress.env("sellerId"), productData.productConditionId, productData.quantity, productData.price, 1)


    //Calculations needed to confirm refund
    //Calculate Product Total Price
    refundQueries.calculateProductTotalPrice(productData.purchasedQuantity, productData.price)
    cy.get('@productTotalPrice').then(productTotalPrice => {
      cy.log("Product Total Price = " + productTotalPrice)
      //Calcualte Refund Product and Refund Shipping Amounts
      refundQueries.calculateRefundProductAmount(productTotalPrice)
      cy.get('@refundProductAmount').then(refundProductAmount => {
        cy.log("Refund Product Amount = " + refundProductAmount)
      })
    })
    refundQueries.calculateRefundShippingAmount(Cypress.env("expeditedShipping"))
    cy.get('@refundShippingAmount').then(refundShippingAmount => {
      cy.log("Refund Shipping Amount = " + refundShippingAmount)
    })
    //Calcualte Total Refund Amount Requested (Product + Shipping)
    cy.get('@refundProductAmount').then(refundProductAmount => {
      cy.get('@refundShippingAmount').then(refundShippingAmount => {
        refundQueries.calculateTotalRefundAmountRequested(refundProductAmount, refundShippingAmount)
      })
    })
    cy.get('@totalrefundAmountRequested').then(totalrefundAmountRequested => {
      cy.log("Total Refund Amount Requested = " + totalrefundAmountRequested)
    })
    //Calculate Product Quantity to Refund
    refundQueries.calculateQuantityToRefund(productData.purchasedQuantity)
    cy.get('@quantityToRefund').then(quantityToRefund => {
      cy.log("Product Quantity to Refund = " + quantityToRefund)
    })


    refundQueries.getInventoryQuantity(productData.productConditionId)
    cy.get('@sellerInventoryQuantity').then(sellerInventoryQuantity => {
      cy.log("Seller Inventory Quantity = " + sellerInventoryQuantity)
    })
   

      //Create headless cart and checkout
      createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6, productData.productConditionId, productData.purchasedQuantity)
      umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
      cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })

      //Shopping Cart Page

     

        // shoppingCartQueries.getCartItemQuantity(buyerData.buyerEmail6).then(cartItemId => {
        //   cy.get('@cartItemId').then(cartItemId => {
        //     cy.log("CartItemId = " + cartItemId)
        //   })
        //   //shoppingCartQueries.getFreeShippingSellerPriceId().then(freeShippingSellerPriceId => {
        //   // cy.get('@freeShippingSellerPriceId').then(freeShippingSellerPriceId => {
        //   //   cy.log("FreeShippingSellerPriceId = " + freeShippingSellerPriceId)
        //   // })
        //   shoppingCartQueries.getExpeditedShippingSellerPriceId().then(expeditedShippingSellerPriceId => {
        //     cy.get('@expeditedShippingSellerPriceId').then(expeditedShippingSellerPriceId => {
        //       cy.log("ExpeditedShippingSellerPriceId = " + expeditedShippingSellerPriceId)
        //     })
        //     umbracoShoppingCart.verifyOrderSummary(productData.purchasedQuantity, productData.price, cartItemId, expeditedShippingSellerPriceId, Cypress.env("expeditedShipping"))
        //   })
        //   //})
        // })



        // cy.get('@sellerInventoryQuantity').then(sellerInventoryQuantity => {
        //   umbracoShoppingCart.verifyPackageDetails(productData.productName, productData.setName, productData.categoryName, productData.rarity, productData.conditionName, productData.price, productData.purchasedQuantity, sellerInventoryQuantity)
        // })


        cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
        cy.setCookie('InContext_' + Cypress.env("sellerKey") + '_AWS' + Cypress.env("envUpper"), 'SellerId=' + Cypress.env("sellerId") + '&SellerKey=' + Cypress.env("sellerKey") + '&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })

        //Checkout Page
        cy.get('#btnCheckout1').click()
        cy.wait(25000)  //have to add wait statemtn since timeout below is not working.
        cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
        shoppingCartReviewPage.checkoutWithMasterCard()

        // //Capture ordernumber
        cy.wait(25000)  //have to add wait statemtn since timeout below is not working.
        //cy.get('strong > :nth-child(2) > a'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
        cy.get('.card > :nth-child(1) > div > :nth-child(2)'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
        cy.get('strong > :nth-child(2) > a').then(completedOrder => {
          const orderNumber = completedOrder.text()
          cy.wrap(orderNumber).as('orderNumber')
          cy.log(orderNumber)
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
        cy.log(Cypress.env("partialRefundPageUrl1"))
        cy.log(Cypress.env("partialRefundPageUrl2"))
        const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
        const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
        cy.log(partialRefundPageUrl1)
        cy.log(partialRefundPageUrl2)
        cy.get('@orderNumber').then(orderNumber => {
          cy.log("Order Number = " + orderNumber)
          cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
        })
        admin.verifySellerLogin()

        //process partial refund
        cy.get('@orderNumber').then(orderNumber => {
          const refundText = "Automation Test: Refund" + orderNumber
          //cy.get('#Message').type(refundText)
          //.as("refundText")
          cy.get('@quantityToRefund').then(quantityToRefund => {
            cy.get('@refundProductAmount').then(refundProductAmount => {
              cy.get('@refundShippingAmount').then(refundShippingAmount => {
                PartialRefundPage.enterPartialRefundDetails(refundText, quantityToRefund, refundProductAmount, refundShippingAmount)
              })
            })
          })
        })
        PartialRefundPage.clickPartialRefundButton()

        //Verify UI items on page after partial refund
        VerifyPartialRefund.verifyPartialRefundNote()
        VerifyPartialRefund.verifyPartialRefundButton()

        //NOT TESTED YET
        //Verify Order calculations
        //Get Tax amounts
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
          const refundQuery = ("Select o.OrderStatusId, so.SellerOrderStatusId, r.RefundTypeId, r.RefundStatusId, r.TotalAmt, r.VendorSalesTaxAmt, r.NYSalesTaxAmt, r.RequestedAmt, r.ShippingAmt, r.RefundNote, r.IsTransactionProcessed, r.TotalAmtAfterStoreCredit "
            + "from dbo.SellerOrder so "
            + "Inner Join dbo.[Order] o On o.OrderId = so.OrderId "
            + "Inner Join dbo.Refund r On r.SellerOrderId = so.SellerOrderId "
            + "Where so.OrderNumber = '" + orderNumber + "'")

          const refundFile = "cypress/fixtures/filesDuringTestRun/refundTablePartialRefundProStoreTcgTaxCC.json"
          databaseQueryFunctions.queryDBWriteToFile(refundQuery, refundFile)


          cy.readFile(refundFile).then((readFile) => {
            //OrderStatusId
            expect(readFile[0]).to.eql(3)
            //SellerOrderStatusId
            expect(readFile[1]).to.eql(13)
            //RefundTypeId
            expect(readFile[2]).to.eql(2)
            //RefundStatusId
            expect(readFile[3]).to.eql(2)
            //TotalAmt
            cy.get('@totalrefundAmountRequested').then(totalrefundAmountRequested => {
              cy.get('@refundedTax').then(refundedTax => {
                refundQueries.calculateTotalRefundAmount(totalrefundAmountRequested, refundedTax)
                cy.get('@totalRefundAmount').then(totalRefundAmount => {
                  expect(readFile[4]).to.eql(totalRefundAmount)
                })
              })
            })
            //VendorSalesTaxAmt
            expect(readFile[5]).to.eql('0.00')
            //NYSalesTaxAmt
            cy.get('@refundedTax').then(refundedTax => {
              expect(readFile[6]).to.eql(refundedTax)
            })
            //RequestedAmt
            cy.get('@refundAmountRequested').then(refundAmountRequested => {
              expect(readFile[7]).to.eql(refundAmountRequested)
            })
            cy.get('@refundShippingAmount').then(refundShippingAmount => {
              expect(readFile[8]).to.eql(refundShippingAmount)
            })
            //CancellationReason
            cy.get('@refundText').then(refundText => {
              expect(readFile[8]).to.eql(refundText)
            })
            expect(readFile[9]).to.eql(3)
            //IsTransactionProcessed
            expect(readFile[10]).to.eql(0)
            //TotalAmtAfterStoreCredit
            cy.get('@totalRefundAmount').then(totalRefundAmount => {
              expect(readFile[11]).to.eql(totalRefundAmount)
            })


          })

        })

        //verifying fees
        cy.get('@orderNumber').then(orderNumber => {
          const feeQuery = ("Select so.OrderNumber, f.Name, sof.* "
            + " from dbo.SellerOrderFee sof  "
            + "Inner Join dbo.SellerOrder so on sof.SellerOrderId = so.SellerOrderId "
            + "Inner Join dbo.FeeType f on sof.FeeTypeId = f.FeeTypeId "
            + "Where so.OrderNumber = '" + orderNumber + "' "
            + "and sof.RateProcessingTypeId = 2 "
            + "Order by f.Name")
          const feeFile = "cypress/fixtures/filesDuringTestRun/feeTablePartialRefundProStoreTcgTaxCC.json"
          databaseQueryFunctions.queryDBWriteToFile(feeQuery, feeFile)


          cy.get('@refundProductAmount').then(refundProductAmount => {
            refundQueries.calculateCommissionFees(refundProductAmount)
            expect(readFile[0]).to.eql(commissionFees)
          })

          cy.get('@refundAmountRequested').then(refundAmountRequested => {
            cy.get('@refundedTax').then(refundedTax => {
              refundQueries.calculateCreditCardUSFees(refundAmountRequested, refundedTax)
              expect(readFile[1]).to.eql(creditCardUSFees)
            })
          })

          cy.get('@refundShippingAmount').then(refundShippingAmount => {
            refundQueries.calculateShippingFees(refundShippingAmount)
            expect(readFile[2]).to.eql(shippingFees)
          })
        })



      
    })
  })
