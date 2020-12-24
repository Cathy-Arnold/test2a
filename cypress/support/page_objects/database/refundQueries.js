export class RefundQueries {

    // calculateProductTotalPrice(purchasedQuantity, price ) {
    //     cy.sqlServer("select cast((Round((SELECT "+purchasedQuantity+" * "+price+"), 2, 0)) as decimal(10,2))").as('productTotalPrice').then((response) => {
    //         cy.get('@productTotalPrice').then(productTotalPrice => {
    //           cy.log(productTotalPrice)  
    //         })
    //     })
    // }


    getInventoryQuantity(productConditionId) {
        cy.sqlServer("select sp.Quantity from dbo.storeprice sp "
      + "INNER JOIN dbo.seller s on sp.sellerid = s.SellerId "
      + "INNER JOIN PDT.ProductCondition pc on PC.ProductConditionId = sp.StoreProductConditionID "
      + "INNER JOIN PDT.Product p on p.ProductId = PC.ProductId "
      + "where s.sellerid = " + Cypress.env("sellerId")
      + " and sp.StoreProductConditionId = " + productConditionId
      + " and sp.ChannelId = 1")
      .as('sellerInventoryQuantity')
    }


    calculateProductTotalPrice(purchasedQuantity, price) {
        cy.sqlServer("select cast((Round((SELECT " + purchasedQuantity + " * " + price + "), 2, 0)) as decimal(10,2))")
            .as('productTotalPrice')
    }

    calculateRefundProductAmount(productTotal) {
        cy.sqlServer("select cast((Round((SELECT " + productTotal + " / 2 ), 2, 0)) as decimal(10,2))")
            .as('refundProductAmount')
    }


    calculateRefundShippingAmount(expeditedShipping) {
        cy.sqlServer("select cast((Round((SELECT " + expeditedShipping + " / 2 ), 2, 0)) as decimal(10,2))")
            .as('refundShippingAmount')
    }

    calculateTotalRefundAmountRequested(refundProductAmountValue, refundShippingAmountValue) {
        cy.sqlServer("select cast((Round((SELECT " + refundProductAmountValue + " + " + refundShippingAmountValue + "), 2, 0)) as decimal(10,2))")
            .as('totalrefundAmountRequested')
    }

    calculateQuantityToRefund(purchasedQuantity) {
        cy.sqlServer("select (" + purchasedQuantity + " / 2 ) ")
            .as('quantityToRefund')
    }
   
    isPayNowEnabled(sellerId) {
        cy.sqlServer("UPDATE dbo.SellerProServicesSettings SET IsPayNowEnabled = 1 where SellerId = " + sellerId)
    }

    dailyRefundCountZero(sellerId) {
        cy.sqlServer("UPDATE dbo.Seller set DailyRefundCount = 0 where SellerId = " + sellerId)
    }

    setExpeditedShippingAmount(sellerId, expeditedShippingPrice) {
        cy.sqlServer("DECLARE @SellerId BIGINT DECLARE @ShippingPrice DECIMAL(8,2) "
            + "SELECT @SellerId = " + sellerId + ",  @ShippingPrice = " + expeditedShippingPrice
            + " IF EXISTS (select top 1 * from dbo.ShippingSellerPrice where ShippingMethodId  = 2 and ShippingCategoryId = 1 and SellerId = @SellerId) "
            + "BEGIN "
            + "UPDATE dbo.ShippingSellerPrice SET Price = @ShippingPrice, UpdatedAt = getutcdate(), UpdatedByUserID = (select UserId from dbo.[User] where ProviderUserName = 'admin@auto.com'), IsActive = 1, IsOverThreshold = 0, IsInviteOnly = 0, Threshold = Null WHERE ShippingSellerPriceId = (select ShippingSellerPriceId from dbo.ShippingSellerPrice where ShippingMethodId  = 2 and ShippingCategoryId = 1 and SellerId = @SellerId) "
            + "END     "
            + "ELSE BEGIN "
            + "INSERT INTO dbo.ShippingSellerPrice (ShippingCategoryId, ShippingMethodId, SellerId, CountryCode, Price, ShippingMethodCode, CreatedAt, UpdatedAt, CreatedByUserId, UpdatedByUserId, IsActive, IsOverThreshold, IsInviteOnly, Threshold) "
            + "SELECT ShippingCategoryId, 2, @SellerId,	'US', @ShippingPrice, 'TCGFIRSTCLASS', getutcdate(), getutcdate(), (select UserId from dbo.[User] where ProviderUserName = 'admin@auto.com'), NULL,	1, 0, 0, NULL FROM ShippingCategory "
            + "END")
    }

    updateInventory(sellerId, productConditionId, quantity, price, channelId) {
        cy.sqlServer("DECLARE @SellerId BIGINT "
            + " DECLARE @ProductConditionId BIGINT "
            + "DECLARE @Quantity INT "
            + "DECLARE @Price DECIMAL(8,2) "
            + "DECLARE @MaxFulfillableQty TINYINT "
            + "DECLARE @ChannelId SMALLINT "
            + "SELECT @SellerId = " + sellerId + ", @ProductConditionId = " + productConditionId + ", @Quantity = " + quantity + ", @Price = '" + price + "' , @ChannelId = " + channelId
            + "IF EXISTS(SELECT 1 FROM dbo.StorePrice WHERE SellerId = @SellerId AND StoreProductConditionId = @ProductConditionId AND ChannelId = @ChannelId) "
            + "BEGIN "
            + "UPDATE dbo.StorePrice SET Price = @Price, Quantity = @Quantity WHERE SellerId = @SellerId And StoreProductConditionId = @ProductConditionId And ChannelId = @ChannelId "
            + "END     "
            + "ELSE BEGIN "
            + "INSERT INTO dbo.StorePrice(StoreProductConditionId, StoreProductId, StoreConditionId, SellerId, Quantity, Price, LastUpdated, MaxQty, ChannelId, ReserveQuantity) "
            + "SELECT ProductConditionId, ProductId, ConditionId, @SellerId, @Quantity, @Price, getutcdate(),  0, @ChannelId, 0 "
            + "FROM PDT.ProductCondition "
            + "WHERE ProductConditionId = @ProductConditionId "
            + "END")
    }

    getTcgTaxAmt(orderNumber) {
        cy.sqlServer("Select TCGTaxAmt From dbo.SellerOrder Where OrderNumber = '" + orderNumber + "'")
            .as('tcgTaxAmt')
    }

    calculateRefundedTax(tcgTaxAmtValue) {
        cy.sqlServer("select cast(Round (" + tcgTaxAmtValue + " /2 ,2,0) as decimal(10,2))")
            .as('refundedTax')
    }

    calculateTotalRefundAmount(totalrefundAmountRequestedValue, refundedTaxValue) {
        cy.server("select cast((Round((SELECT " + totalrefundAmountRequestedValue + " + " + refundedTaxValue + "), 2, 0)) as decimal(10,2))")
            .as('totalRefundAmount')
    }




  //for Pro Sellers
    calculateCommissionFees(refundProductAmountValue) {
       cy.server("select cast((Round((SELECT   "+refundProductAmountValue+" * 0.0250), 2, 0)) as decimal(10,2))")
        .as('commissionFees')
    }
    //for Pro Sellers
    calculateCreditCardUSFees(refundAmountRequestedValue, refundedTaxvalue) {
        cy.server("Select cast((Round((SELECT ("+refundAmountRequestedValue+" + "+refundedTaxvalue+") * 0.0250), 2, 0)) as decimal(10,2))")
            .as('creditCardUSFees')
    }
    //for Pro Sellers
    calculateShippingFees(refundShippingAmountValue) {
        cy.server("select cast((Round((SELECT "+refundShippingAmountValue+" * 0.0250), 2, 0)) as decimal(10,2))")
            .as('shippingFees')
    }





    

}

export const refundQueries = new RefundQueries()



