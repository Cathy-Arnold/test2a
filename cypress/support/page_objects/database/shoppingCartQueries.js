export class ShoppingCartQueries {

    getCartItemQuantity(buyer) {
        cy.sqlServer("select ci.CartItemID "
        + " from  dbo.cartitem ci "
        + " Inner Join  Cart c ON c.Cartid = ci.CartId "
        + " Inner Join [User] u ON u.ProviderUserKey = c.ProviderUserKey "
        + " where u.ProviderUserName = 'buyer' "
        + " order by c.Cartid desc")
            .as('cartItemId')
    }

    getFreeShippingSellerPriceId() {
        cy.sqlServer("select * from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 1 and 	ShippingMethodId = 5")
        .as('freeShippingSellerPriceId')
    }


    getStandardShippingSellerPriceId() {
        cy.sqlServer("select * from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 1 and 	ShippingMethodId = 1")
        .as('expeditedShippingSellerPriceId')
    }

    getExpeditedShippingSellerPriceId() {
        cy.sqlServer("select * from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 2 and 	ShippingMethodId = 1")
        .as('expeditedShippingSellerPriceId')
    }



}

export const shoppingCartQueries = new ShoppingCartQueries()