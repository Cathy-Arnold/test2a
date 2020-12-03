/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import { createCart } from "../../support/page_objects/umbraco/createCart"



describe('Create a cart using a Post statement', () => {

  const buyer = "buyerEmail6"

  it('Create a cart using a Post Statment', () => {
    createCart.createCartVistChoppingCartPage(buyer)
   



  })

})


