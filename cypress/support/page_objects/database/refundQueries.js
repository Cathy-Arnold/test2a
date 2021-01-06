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
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT " + purchasedQuantity + " * " + price + "), 2, 0)) as decimal(10,2)))  AS Price")
            .as('productTotalPrice')
    }


 
    calculateRefundProductAmount(productTotal) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT " + productTotal + " / 2 ), 2, 0)) as decimal(10,2))) AS Price")
            .as('refundProductAmount')
    }

  

    calculateRefundShippingAmount(expeditedShipping) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT " + expeditedShipping + " / 2 ), 2, 0)) as decimal(10,2))) AS Price")
            .as('refundShippingAmount')
    }

    calculateTotalRefundAmountRequested(refundProductAmountValue, refundShippingAmountValue) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT " + refundProductAmountValue + " + " + refundShippingAmountValue + "), 2, 0)) as decimal(10,2))) AS Price")
            .as('totalRefundAmountRequested')
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
        cy.sqlServer("select Convert (varchar, cast(Round (" + tcgTaxAmtValue + " /2 ,2,0) as decimal(10,2))) AS Price")
            .as('refundedTax')
    }

    calculateTotalRefundAmount(totalRefundAmountRequestedValue, refundedTaxValue) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT " + totalRefundAmountRequestedValue + " + " + refundedTaxValue + "), 2, 0)) as decimal(10,2))) AS Price")
            .as('totalRefundAmount')
    }

    queryRefundTable(orderNumber, fileName) {
        cy.sqlServer("Select o.OrderStatusId, so.SellerOrderStatusId, r.RefundTypeId, r.RefundStatusId, CONVERT(varchar, r.TotalAmt) AS Price, CONVERT(varchar,  r.VendorSalesTaxAmt) AS Price, CONVERT(varchar,  r.NYSalesTaxAmt) AS Price, CONVERT(varchar,  r.RequestedAmt) AS Price, CONVERT(varchar,  r.ShippingAmt) AS Price, r.RefundNote, r.IsTransactionProcessed, CONVERT(varchar,  r.TotalAmtAfterStoreCredit) AS Price "
        + "from dbo.SellerOrder so "
        + "Inner Join dbo.[Order] o On o.OrderId = so.OrderId "
        + "Inner Join dbo.Refund r On r.SellerOrderId = so.SellerOrderId "
        + "Where so.OrderNumber = '" + orderNumber + "'").then((response) => {
            cy.writeFile(fileName, response)
            })
    }


  //for Pro Sellers
    calculateCommissionFees(refundProductAmountValue) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT "+ refundProductAmountValue +" * 0.0250), 2, 0)) as decimal(10,2))) AS Price")
        .as('commissionFees')
    }
    //for Pro Sellers
    calculateCreditCardUSFees(totalRefundAmountRequestedValue,refundedTaxValue) {
        cy.sqlServer("Select Convert (varchar, cast((Round((SELECT ("+totalRefundAmountRequestedValue+" + "+refundedTaxValue+") * 0.0250), 2, 0)) as decimal(10,2))) AS Price")
            .as('creditCardUSFees')
    }
    //for Pro Sellers
    calculateShippingFees(refundShippingAmountValue) {
        cy.sqlServer("select Convert (varchar, cast((Round((SELECT "+refundShippingAmountValue+" * 0.0250), 2, 0)) as decimal(10,2))) AS Price")
            .as('shippingFees')
    }


    //Get the SellerProductCode (Used when checking the ProductId [used by Crystal Commeres]).
    getSellerProductCode (orderNumber) {
        cy.sqlServer("Select sop.SellerProductCode From SellerOrder so Inner Join dbo.SellerOrderProduct sop on sop.SellerOrderId = so.SellerOrderId where so.ordernumber = "+orderNumber)
            .as('sellerProductCode')
    }

    
    //Remaining Inventory
    calculateRemainingInventory (quantity, quantityToRefund) {
        cy.sqlServer("select "+quantity+" - "+quantityToRefund)
            .as('remainingInventory')
    }




//QuantityAfterRefund
calculateQuantityAfterRefund (seller, productConditionId) {
    cy.sqlServer("SELECT top 1 sp.Quantity FROM " 
    + "dbo.StorePrice sp " 
    + "INNER JOIN PDT.ProductCondition pc ON sp.StoreProductConditionID = pc.ProductConditionId " 
    + "INNER JOIN PDT.Condition c ON pc.ConditionId = c.ConditionId " 
    + "INNER JOIN PDT.Product p ON p.ProductId = pc.ProductId "
    + "INNER JOIN PDT.SetName sn ON sn.SetNameID = p.SetNameID " 
    + "INNER JOIN PDT.Category cat ON cat.CategoryID = p.CategoryId " 
    + "INNER JOIN PDT.ProductType pt ON pt.ProductTypeId = p.ProductTypeID " 
    + "INNER JOIN PDT.ProductStatus ps ON ps.ProductStatusId = p.ProductStatusId " 
    + "INNER JOIN dbo.Seller s ON s.SellerID = sp.SellerId " 
    + "INNER JOIN dbo.ShippingSellerPrice ssp ON s.SellerId = ssp.SellerId " 
    + "AND p.ShippingCategoryId = ssp.ShippingCategoryId AND ssp.ShippingMethodId = 1 " 
    + "Where s.SellerId = "+seller   
    + "and sp.ChannelId = 1 " 
    + "and sp.StoreProductConditionId = "+productConditionId
    + "Order by sp.Quantity desc  ")
    .as('quantityAfterRefund')
}







}

export const refundQueries = new RefundQueries()



