/// <reference types="cypress" />
///<reference types="cypress-iframe" />

 import { createCart } from "../../support/page_objects/umbraco/createCart"
// import { shoppingCartReviewPage } from "../../support/page_objects/umbraco/checkout"
 import { umbracoShoppingCart } from "../../support/page_objects/umbraco/umbracoShoppingCart"

// import { PartialRefundPage, VerifyPartialRefundItems } from "../../support/page_objects/admin/partialRefund"
// import { VerifyPartialRefund } from "../../support/page_objects/admin/partialRefund"
// import { admin } from "../../support/page_objects/admin/adminFunctions"



describe('Create a cart using a Post statement', () => {

  const buyerCookieName = "BuyerEmail6"
  var buyerData = require('../../fixtures/buyer/umbraco/buyer')
  var passwordData = require('../../fixtures/password/standardPassword')

  it('test if ', () => {

    //cy.visit('https://store.tcgplayer-qa.com/login/revalidate?returnUrl=/shoppingcart/review?sf=6d9fccfa')
    //createCart.createCartVistShoppingCartPage(buyerData.buyerEmail6)

    cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueBuyerEmail6"), { httpOnly: true })
    cy.visit('https://cart.tcgplayer-stg.com/shoppingcart?sf=F417072D&ck=751c41ddcbff4672b045b542f9fa7569')
    //cy.setCookie('BuyerRevalidationKey', '', { httpOnly: true })   //set a blank cookie that expires 20 years into the future.  Needs to be at the end of the cart test prior to going to review page
    cy.get('#btnCheckout1').click()
    cy.wait(20000)//Need this wait because takes awhile for the page to load


    //If we get logon page
    cy.get('body').then((body) => {
      //console.log(body.find('ul:contains(Email)'))
      console.log(body.find('h2:contains(Confirm your account)'))
      // if (body.find('form').length > 0) {
      //   cy.get('#Email').type(buyerData.buyerEmail6)
      //  cy.get('#Password').type(passwordData.password)
      //   cy.get('.GreenButtonNoArrow').click()
      // }
    })
  })


})





