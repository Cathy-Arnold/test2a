export class ShoppingCartQueries {

    getCartItemId(buyer) {
        cy.sqlServer("select ci.CartItemID "
        + " from  dbo.cartitem ci "
        + " Inner Join  Cart c ON c.Cartid = ci.CartId "
        + " Inner Join [User] u ON u.ProviderUserKey = c.ProviderUserKey "
        + " where u.ProviderUserName = '"+buyer+"' "
        + " order by c.Cartid desc")
            .as('cartItemId')
    }

   



    getFreeShippingSellerPriceId() {
        cy.sqlServer("select ShippingSellerPriceId from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 1 and 	ShippingMethodId = 5")
        .as('freeShippingSellerPriceId')
    }


    getStandardShippingSellerPriceId() {
        cy.sqlServer("select ShippingSellerPriceId from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 1 and 	ShippingMethodId = 1")
        .as('standardShippingSellerPriceId')
    }

    getExpeditedShippingSellerPriceId() {
        cy.sqlServer("select ShippingSellerPriceId from dbo.ShippingSellerPrice where SellerId = "+ Cypress.env("sellerId")+" and CountryCode = 'US' and ShippingCategoryId = 1 and 	ShippingMethodId = 2")
        .as('expeditedShippingSellerPriceId')
    }



}

export const shoppingCartQueries = new ShoppingCartQueries()