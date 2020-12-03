/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"

describe('Umbraco Cart Checkout', () => {


  it('Login to Umbraco with Headless Authorization and proceed directly to the shopping cart', () => {
    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    cy.visit('https://cart.tcgplayer-stg.com/shoppingcart?sf=F417072D&ck=6573d4d1289743178d251d1a530a56af')

    //Shopping Cart
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
      expect(cardName).to.eql('Blooming Marsh')
    })
    cy.get('.itemsContents > p').then(($setCategoryName) => {      //Set and category name
      const setCategoryName = $setCategoryName.text()
      expect(setCategoryName).to.eql('Kaladesh - Magic')
    })
    cy.get('.detailsContents > :nth-child(1)').then(($rarity) => {      //rarity
      const rarity = $rarity.text()
      expect(rarity).to.eql('Rarity: R')
    })
    cy.get('.detailsContents > :nth-child(2)').then(($condition) => {      //Condition
      const condition = $condition.text().trim()
      expect(condition).to.eql('Condition: Near Mint - Spanish')
    })
    cy.get('.priceContents').then(($itemPrice) => {      //price of item
      const itemPrice = $itemPrice.text().trim()
      expect(itemPrice).to.eql('$5.26')
    })
    // cy.get('#cartItemQty_1758107665').then(($itemQuantity) => {      //item Quantity
    //   const itemQuantity = $itemQuantity.text().trim()
    //   expect(itemQuantity).to.eql('1')
    // })
    cy.get('.qtyContentsLeft > p').then(($inventoryQuantity) => {      //Text: 'of' inventory Quantity
      const inventoryQuantity = $inventoryQuantity.text().trim()
      expect(inventoryQuantity).to.eql('of 22')
    })
    cy.get('.update > .cartStyle > span').should('be.visible')    //Update
    cy.get('.remove').should('be.visible')   //remove

    //Order Summary
    cy.get('#sellerSummary_8 > h2').should('be.visible')    //Order Summary text
    cy.get(':nth-child(4) > tbody > tr > .leftCol').should('be.visible')   //Number of Items text
    cy.get('#sellerSummaryItemCount_8').then(($actualNumberOfItems) => {      //Actual Number of Items
      const actualNumberOfItems = $actualNumberOfItems.text()
      expect(actualNumberOfItems).to.eql('1')
    })
    cy.get(':nth-child(6) > tbody > tr > .leftCol > span').should('be.visible')  //Items text

    cy.get('#sellerSummaryItemTotal_8').then(($itemsDollarTotal) => {     // Items Dollar Total
      const itemsDollarTotal = $itemsDollarTotal.text()
      expect(itemsDollarTotal).to.eql('$5.26')
    })

    cy.get('#sellerSummary_8 > :nth-child(7) > tbody > :nth-child(1) > td').should('be.visible')   //Shipping Options text
    cy.get('#shippingColumn_8_234440 > .shippingText').should('be.visible')   //Free Shipping text




    cy.get('#shippingOptionCost_8_234440 > span').then(($freeShippingAmount) => {      //Free Shipping amount
      const freeShippingAmount = $freeShippingAmount.text()
      expect(freeShippingAmount).to.eql('$0.00')
    })
    
    cy.get('#shippingColumn_8_23801 > .shippingText').should('be.visible')  //Expedited Shipping text


    cy.get('#shippingOptionCost_8_23801 > span').then(($expeditedShippingAmount) => {       //Expedited Shipping amount
      const expeditedShippingAmount = $expeditedShippingAmount.text()
      expect(expeditedShippingAmount).to.eql('$6.99')
    })

    cy.get('#shippingColumn_8_194525 > .shippingText').should('be.visible')   //In-Store Pickup text


    cy.get('#shippingOptionCost_8_194525').then(($inStorePickupAmount) => {      //In-Store Pickup amount
      const inStorePickupAmount = $inStorePickupAmount.text()
      expect(inStorePickupAmount).to.eql('$0.00')
    })
    cy.get('.right').should('be.visible')  //Your Order qualifies for free shipping text
    cy.get(' #sellerSummary_8 > .subtotal > tbody > tr > :nth-child(1)').should('be.visible')   //Subtotal text



    cy.get(' #sellerSubtotal_8').then(($subtotalAmount) => {     //Subtotal amount
      const subtotalAmount = $subtotalAmount.text()
      expect(subtotalAmount).to.eql('$5.26')
    })


    //Checkout Page
   cy.get('#btnCheckout1').click()

    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    cy.visit('https://store.tcgplayer-stg.com/shoppingcart/review?sf=f417072d')
    cy.get('[value="Mastercard"]').click()
    shoppingCartReviewPage.creditDebitOption().type('5454545454545454')
    shoppingCartReviewPage.expirationMonth().select('12 December')
    shoppingCartReviewPage.expirationYear().select('2039') 
    shoppingCartReviewPage.cvvCode().type('123')
    shoppingCartReviewPage.saveCardcheckbox().click()
    
 

  })


})
