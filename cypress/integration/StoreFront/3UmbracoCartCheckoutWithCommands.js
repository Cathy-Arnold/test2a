/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

describe('Umbraco Cart Checkout', () => {

  const buyer = "oauthCookieValueBuyerEmail6"

  it('Login to Umbraco with Headless Authorization and proceed directly to the shopping cart. Complete checkout', () => {
    //Shopping Cart Page
    umbracoShoppingCart.setBuyerAuthCookie(buyer)
    umbracoShoppingCart.setBuyerRevalidationKeyCookie()
    umbracoShoppingCart.visitUmbracoShoppingCartPage()
    umbracoShoppingCart.verifyPackageDetails()
    umbracoShoppingCart.verifyOrderSummary()

    //Checkout Page
    cy.get('#btnCheckout1').click()
    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future
    cy.visit('https://store.tcgplayer-stg.com/shoppingcart/review?sf=f417072d')
    shoppingCartReviewPage.checkoutWithMasterCard()

  })


})
