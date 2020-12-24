/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"
import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/orders/partialRefund"
import { VerifyPartialRefund } from "../../support/page_objects/admin/orders/partialRefund"
import { admin } from "../../support/page_objects/admin/adminFunctions"

import { databaseQueryFunctions } from "../../support/page_objects/database/databaseQueryFunctions"
import { refundQueries } from "../../support/page_objects/database/refundQueries"



describe('Create a cart using a Post statement', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../fixtures/buyer/umbraco/buyer')
  var adminData = require('../../fixtures/admin/admin')
  var passwordData = require('../../fixtures/password/standardPassword')
  var productData = require('../../fixtures/products/partialRefund')

  it('Create a cart using a Post Statment, Checkout, Partial Refund', () => {


    //Setup prior to test
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



    // .as('productTotalPrice')

    //cy.sqlServer("select cast((Round((SELECT "+purchasedQuantity+" * "+price+"), 2, 0)) as decimal(10,2))").as('productTotalPrice')


    // cy.get('@productTotalPrice').then(productTotalPrice => {
    //   refundQueries.calculateRefundProductAmount(productTotalPrice)
    //     //.as('refundProductAmount')
    // })

    // refundQueries.calculateRefundShippingAmount(Cypress.env("expeditedShipping"))
    //   //.as('refundShippingAmount')



    // cy.get('@refundProductAmount').then(refundProductAmount => {
    //   cy.get('@refundShippingAmount').then(refundShippingAmount => {
    //     refundQueries.calculateRefundAmountRequested(refundProductAmount, refundShippingAmount)
    //      // .as('refundAmountRequested')
    //   })
    // })

    // refundQueries.calculateQuantityToRefund(productData.purchasedQuantity)
    //   //.as('quantityToRefund')




    //Get Product Info

    // const partialRefundProductQuery = "select sp.storePriceId from dbo.storeprice sp INNER JOIN dbo.seller s on sp.sellerid = s.SellerId INNER JOIN PDT.ProductCondition pc on PC.ProductConditionId = sp.StoreProductConditionID INNER JOIN PDT.Product p on p.ProductId = PC.ProductId where s.sellerid = "+Cypress.env("sellerId")+" and sp.StoreProductConditionId = "+productData.partialRefundSkuId+ "and sp.ChannelId = 1"

    // const partialRefundProductQuery = "select sp.storePriceId from dbo.storeprice sp " 
    // + "INNER JOIN dbo.seller s on sp.sellerid = s.SellerId " 
    // + "INNER JOIN PDT.ProductCondition pc on PC.ProductConditionId = sp.StoreProductConditionID " 
    // + "INNER JOIN PDT.Product p on p.ProductId = PC.ProductId "
    // + "where s.sellerid = "+Cypress.env("sellerId")
    // + "and sp.StoreProductConditionId = "+productData.partialRefundSkuId
    // + "and sp.ChannelId = 1"

    ////Enable IsPayNowEnabled
    // cy.sqlServer("UPDATE dbo.SellerProServicesSettings SET IsPayNowEnabled = 1 where SellerId = "+Cypress.env("sellerId"))


    ////Set daily refund count to zero
    // cy.sqlServer("UPDATE dbo.Seller set DailyRefundCount = 0 where SellerId = "+Cypress.env("sellerId"))


    ////Set expedited shipping amount
    // cy.sqlServer("DECLARE @SellerId BIGINT "
    // + "SELECT @SellerId = "+Cypress.env("sellerId") 
    // + "IF EXISTS (select top 1 * from dbo.ShippingSellerPrice where ShippingMethodId  = 2 and ShippingCategoryId = 1 and SellerId = @SellerId) "
    // + "BEGIN "
    // + "UPDATE dbo.ShippingSellerPrice SET Price = "+Cypress.env("expeditedShipping")+", UpdatedAt = getutcdate(), UpdatedByUserID = (select UserId from dbo.[User] where ProviderUserName = 'admin@auto.com'), IsActive = 1, IsOverThreshold = 0, IsInviteOnly = 0, Threshold = Null WHERE ShippingSellerPriceId = (select ShippingSellerPriceId from dbo.ShippingSellerPrice where ShippingMethodId  = 2 and ShippingCategoryId = 1 and SellerId = @SellerId) "
    // + "END     "              
    // + "ELSE BEGIN "
    // + "INSERT INTO dbo.ShippingSellerPrice (ShippingCategoryId, ShippingMethodId, SellerId, CountryCode, Price, ShippingMethodCode, CreatedAt, UpdatedAt, CreatedByUserId, UpdatedByUserId, IsActive, IsOverThreshold, IsInviteOnly, Threshold) "
    // + "    SELECT ShippingCategoryId,	2,	@SellerId,	'US',	"+Cypress.env("expeditedShipping")+",	'TCGFIRSTCLASS',	getutcdate(),	getutcdate(),	(select UserId from dbo.[User] where ProviderUserName = 'admin@auto.com'),	NULL,	1,	0,	0,	NULL FROM ShippingCategory "
    // + "END") 

    //Get expedited ShippingSellerPriceId 
    // cy.sqlServer("Select ssp.ShippingSellerPriceId "
    //   + "from dbo.ShippingSellerPrice ssp " 
    //   + "Inner Join dbo.Shippingmethod sm  ON sm.ShippingMethodId = ssp.ShippingMethodId " 
    //   + "where ssp.ShippingMethodId = 2 " //Expedited 
    //   + "and ssp.ShippingCategoryId = 1 "
    //   + "and SellerId = "+Cypress.env("sellerId")
    //   + " and IsActive = 1")

    ////Update inventory for Channel 0
    // cy.sqlServer("DECLARE @SellerId BIGINT "
    //   + "DECLARE @ProductConditionId BIGINT "
    //   + "DECLARE @Quantity INT "
    //   + "DECLARE @Price DECIMAL(8,2) "
    //   + "DECLARE @MaxFulfillableQty TINYINT "
    //   + "DECLARE @ChannelId SMALLINT "
    //   + "SELECT @SellerId = "+Cypress.env("sellerId")+", @ProductConditionId = "+productData.partialRefundSkuId+", @Quantity = "+productData.quantity+", @Price = '"+productData.price+"' , @ChannelId = 0 "
    // + "IF EXISTS(SELECT 1 FROM dbo.StorePrice WHERE SellerId = @SellerId AND StoreProductConditionId = @ProductConditionId AND ChannelId = @ChannelId) "
    // + "BEGIN "
    // + "UPDATE dbo.StorePrice SET Price = @Price, Quantity = @Quantity WHERE SellerId = @SellerId And StoreProductConditionId = @ProductConditionId And ChannelId = @ChannelId "
    // + "END     "              
    // + "ELSE BEGIN "
    // + "INSERT INTO dbo.StorePrice(StoreProductConditionId, StoreProductId, StoreConditionId, SellerId, Quantity, Price, LastUpdated, MaxQty, ChannelId, ReserveQuantity) "
    // + "SELECT ProductConditionId, ProductId, ConditionId, @SellerId, @Quantity, @Price, getutcdate(),  0, @ChannelId, 0 "
    // + "FROM PDT.ProductCondition "
    // + "WHERE ProductConditionId = @ProductConditionId "
    // + "END")

    ////Update inventory for Channel 1
    //   cy.sqlServer("DECLARE @SellerId BIGINT "
    //   + "DECLARE @ProductConditionId BIGINT "
    //   + "DECLARE @Quantity INT "
    //   + "DECLARE @Price DECIMAL(8,2) "
    //   + "DECLARE @MaxFulfillableQty TINYINT "
    //   + "DECLARE @ChannelId SMALLINT "
    //   + "SELECT @SellerId = "+Cypress.env("sellerId")+", @ProductConditionId = "+productData.partialRefundSkuId+", @Quantity = "+productData.quantity+", @Price = '"+productData.price+"' , @ChannelId = 1 "
    // + "IF EXISTS(SELECT 1 FROM dbo.StorePrice WHERE SellerId = @SellerId AND StoreProductConditionId = @ProductConditionId AND ChannelId = @ChannelId) "
    // + "BEGIN "
    // + "UPDATE dbo.StorePrice SET Price = @Price, Quantity = @Quantity WHERE SellerId = @SellerId And StoreProductConditionId = @ProductConditionId And ChannelId = @ChannelId "
    // + "END     "              
    // + "ELSE BEGIN "
    // + "INSERT INTO dbo.StorePrice(StoreProductConditionId, StoreProductId, StoreConditionId, SellerId, Quantity, Price, LastUpdated, MaxQty, ChannelId, ReserveQuantity) "
    // + "SELECT ProductConditionId, ProductId, ConditionId, @SellerId, @Quantity, @Price, getutcdate(),  0, @ChannelId, 0 "
    // + "FROM PDT.ProductCondition "
    // + "WHERE ProductConditionId = @ProductConditionId "
    // + "END")









    ////examples
    //   const partialRefundProductFile = "cypress/fixtures/filesDuringTestRun/partialRefundProduct.json"
    //   databaseQueryFunctions.queryDBWriteToFile(partialRefundProductQuery, partialRefundProductFile)
    //   const state = (readFile[4])


    //   const sellerProServicesSettingsQuery = "select SellerId,StoreName,StreetAddress,City,[State],Zip from dbo.SellerProServicesSettings where SellerId = " + Cypress.env("sellerId")
    //   const sellerProServicesSettingsFile = "cypress/fixtures/filesDuringTestRun/SellerProServicesSettings.json"

    //   databaseQueryFunctions.queryDBWriteToFile(sellerProServicesSettingsQuery, sellerProServicesSettingsFile)
    //   cy.readFile(sellerProServicesSettingsFile).then((readFile) => {
    //       const state = (readFile[4])
    //       cy.log(state)
    //   })
    //   cy.readFile(sellerProServicesSettingsFile).then((readFile) => {
    //       const zip = (readFile[5])
    //       cy.log(zip)
    //   })













    // createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6, productData.partialRefundSkuId)
    // umbracoShoppingCart.setBuyerAuthCookie(buyerCookieName)
    // cy.setCookie('InContext_'+Cypress.env("sellerKey")+'_AWS' + Cypress.env("envUpper"), 'SellerId='+Cypress.env("sellerId")+'&SellerKey='+Cypress.env("sellerKey")+'&StoreName=adventuresON&StreetAddress=6026+Fair+Oaks+Blvd&City=Carmichael&StateProvince=CA&PostalCode=95608&EmailAddress=customerservice%40adventuresON.com&PhoneNumber=(916)+973-9064&StorefrontUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2f&CartKey=+cartKey+&LogoImageUrl=https%3a%2f%2fstage-tcgplayer.s1.umbraco.io%2fmedia%2f1021%2fdefault-logo.png&IsPayNowEnabled=True&IsPayLaterEnabled=True&ChannelId=1', { httpOnly: true })

    // //Shopping Cart Page
    // umbracoShoppingCart.verifyPackageDetails(productData.productName, productData.setName, productData.categoryName, productData.rarity, productData.conditionName)
    // //umbracoShoppingCart.verifyOrderSummary()
    // cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future

    // //Checkout Page
    // cy.get('#btnCheckout1').click()
    // cy.get('[value="Mastercard"]'), { timeout: 180000 }   //Will look for Mastercard input box up to 3 minutes.  Ensures page loads.
    // shoppingCartReviewPage.checkoutWithMasterCard()



    // //To create URL for Partial Refund pageand visit the page
    // cy.get('strong > :nth-child(2) > a'), { timeout: 180000 }   //Will look for order number up to 3 minutes.  Ensures page loads.
    // cy.get('strong > :nth-child(2) > a').then(completedOrder => {
    //   const orderNumber = completedOrder.text()
    //   cy.log(orderNumber)
    //   admin.headlessLoginAdminSite((Cypress.env("sellerEmail")), passwordData.password)
    //   cy.log(Cypress.env("partialRefundPageUrl1"))
    //   cy.log(Cypress.env("partialRefundPageUrl2"))
    //   const partialRefundPageUrl1 = (Cypress.env("partialRefundPageUrl1"))
    //   const partialRefundPageUrl2 = (Cypress.env("partialRefundPageUrl2"))
    //   cy.log(partialRefundPageUrl1)
    //   cy.log(partialRefundPageUrl2)
    //   cy.visit(partialRefundPageUrl1 + orderNumber + partialRefundPageUrl2)
    //   admin.verifySellerLogin()

    //   //process partial refund
    //   cy.get('#Message').type("Automation Test: Cancel" + orderNumber)
    //   PartialRefundPage.enterPartialRefundDetails()
    //   PartialRefundPage.clickPartialRefundButton()

    //   //Verify UI items on page after partial refund
    //   VerifyPartialRefund.verifyPartialRefundNote()
    //   VerifyPartialRefund.verifyPartialRefundButton()


    // //NOT TESTED YET
    //  ////Get TCGTaxAmt
    //  cy.sqlServer("Select TCGTaxAmt From dbo.SellerOrder "
    //  Where OrderNumber = '${OrderNumber}'")
    //  .as('tCGTaxAmt')

    //  ////Calculate RefundedTax
    //  cy.sqlServer("select cast(Round (${TCGTaxAmt} /2 ,2,0) as decimal(10,2))")
    //  .as('refundedTax')




    // })
  })

})



