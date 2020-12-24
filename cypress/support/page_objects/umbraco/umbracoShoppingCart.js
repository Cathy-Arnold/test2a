export class UmbracoShoppingCart {

    
    setBuyerAuthCookie(buyerCookieName) {
        cy.get('.shoppingCartHeader').then(($Loggedin) => {
            const valueOauthCookieValue = 'oauthCookieValue'
            cy.log(valueOauthCookieValue)
            cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env(valueOauthCookieValue+buyerCookieName), { httpOnly: true })
        })
    }


    setBuyerRevalidationKeyCookie() {
        cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    }
    visitUmbracoShoppingCartPage() {
        cy.visit('https://cart.tcgplayer-'+Cypress.env("env")+'.com/shoppingcart?sf='+cartKey+'&ck=e9c04d655f034915907518e3a0a68f5f')
    }



    //Shopping Cart
    verifyPackageDetails(productName, setName, categoryName, rarity, conditionName, pricePerItem, purchasedQuantity, quantity) {
        //Shopping Cart Header
        cy.get('.shoppingCartHeader').should('be.visible')

        //Package Header
        cy.get('.packageHeader').should('be.visible')
        
        //Cart Details Headers
        cy.get('.itemsHead > h4').should('be.visible')
        cy.get('.detailsHead > h4').should('be.visible')
        cy.get('.priceHead > h4').should('be.visible')
        cy.get('.qtyHead > h4').should('be.visible')

        //Cart Details
        cy.get('.lazy').should('be.visible')   //thumbnail
        cy.get('h3 > .cartStyle').then(($cardName) => {  //Card Name
            const cardName = $cardName.text()
            expect(cardName).to.eql(productName)
        })
        cy.get('.itemsContents > p').then(($setCategoryName) => {      //Set and category name
            const setCategoryName = $setCategoryName.text()
            expect(setCategoryName).to.eql(setName +" - "+ categoryName)
        })
        cy.get('.detailsContents > :nth-child(1)').then(($rarity) => {      //rarity
            const rarityUI = $rarity.text()
            expect(rarityUI).to.eql("Rarity: "+ rarity)
        })
        cy.get('.detailsContents > :nth-child(2)').then(($condition) => {      //Condition
            const condition = $condition.text().trim()
            expect(condition).to.eql("Condition: "+ conditionName)
        })
        cy.get('.priceContents').then(($itemPrice) => {      //price of item
            const itemPrice = $itemPrice.text().trim()
            expect(itemPrice).to.eql("$"+pricePerItem)
        })
        cy.get("#cartItemQty_"+cartItemId).then(($itemQuantity) => {      //item Quantity
            const itemQuantity = $itemQuantity.text().trim()
            expect(itemQuantity).to.eql(purchasedQuantity)
          })
          
          
          cy.get('.qtyContentsLeft > p').then(($inventoryQuantity) => {      //Text: 'of' inventory Quantity
              const inventoryQuantity = $inventoryQuantity.text().trim()
              expect(inventoryQuantity).to.eql("of "+quantity)
          })


        cy.get('.update > .cartStyle > span').should('be.visible')    //Update
        cy.get('.remove').should('be.visible')   //remove
    }

    
    verifyOrderSummary(purchasedQuantity, price, expeditedShippingId, expeditedPrice) {
        //Order Summary
        cy.get('#sellerSummary_'+Cypress.env("sellerId")+' > h2').should('be.visible')    //Order Summary text
        cy.get(':nth-child(4) > tbody > tr > .leftCol').should('be.visible')   //Number of Items text
        cy.get('#sellerSummaryItemCount_'+Cypress.env("sellerId")).then(($actualNumberOfItems) => {      //Actual Number of Items
            const actualNumberOfItems = $actualNumberOfItems.text()
            expect(actualNumberOfItems).to.eql(purchasedQuantity)
        })
        cy.get(':nth-child(6) > tbody > tr > .leftCol > span').should('be.visible')  //Items text

        cy.get('#sellerSummaryItemTotal_'+Cypress.env("sellerId")).then(($itemsDollarTotal) => {     // Items Dollar Total
            const itemsDollarTotal = $itemsDollarTotal.text()
            expect(itemsDollarTotal).to.eql("$"+price+".00")
        })
          ////Not using Free shipping ID in this.  No parameter set above.  Not tested.
        // cy.get("#sellerSummary_"+Cypress.env("sellerId")+" > :nth-child(7) > tbody > :nth-child(1) > td").should("be.visible")   //Shipping Options text
        // cy.get("#shippingColumn_"+Cypress.env("sellerId")+"_"+freeShippingId+" > .shippingText").should("be.visible")   //Free Shipping text

        // cy.get("#shippingOptionCost_"+Cypress.env("sellerId")+"_"+freeShippingId+" > span").then(($freeShippingAmount) => {      //Free Shipping amount
        //     const freeShippingAmount = $freeShippingAmount.text()
        //     expect(freeShippingAmount).to.eql('$0.00')
        // })

        cy.get("#shippingColumn_"+Cypress.env("sellerId")+"_"+expeditedShippingId+" > .shippingText").should("be.visible")  //Expedited Shipping text


        cy.get("#shippingOptionCost_"+Cypress.env("sellerId")+"_"+expeditedShippingId+" > span").then(($expeditedShippingAmount) => {       //Expedited Shipping amount
            const expeditedShippingAmount = $expeditedShippingAmount.text()
            expect(expeditedShippingAmount).to.eql("$"+expeditedPrice)
        })
        // //Not using now.
        // cy.get('#shippingColumn_'+Cypress.env("sellerId")+'_194525 > .shippingText').should('be.visible')   //In-Store Pickup text
       
        // cy.get('#shippingOptionCost_'+Cypress.env("sellerId")+'_194525').then(($inStorePickupAmount) => {      //In-Store Pickup amount
        //     const inStorePickupAmount = $inStorePickupAmount.text()
        //     expect(inStorePickupAmount).to.eql('$0.00')
        // })
        // cy.get('.right').should('be.visible')  //Your Order qualifies for free shipping text
        // cy.get(' #sellerSummary_'+Cypress.env("sellerId")+' > .subtotal > tbody > tr > :nth-child(1)').should('be.visible')   //Subtotal text


        cy.get("#sellerSubtotal_"+Cypress.env("sellerId")).then(($subtotalAmount) => {     //Subtotal amount
            const subtotalAmount = $subtotalAmount.text()
            expect(subtotalAmount).to.eql("$"+price+".00")
        })

    }





}

export const umbracoShoppingCart = new UmbracoShoppingCart()

