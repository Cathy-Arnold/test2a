
export class adminFunctions {

    setAdminAuthCookie() {
        cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueSeller"), { httpOnly: true })
    }

    visitPartialRefundPage() {
        cy.visit(Cypress.env("partialRefundPageUrl"))
    }

    verifyAdminLogin() {
        cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
            const LoggedInUser = $Loggedin.text()
            cy.log(Cypress.env('adminEmail'))
            expect(LoggedInUser).to.contain(Cypress.env("adminEmail"))
        })
    }

    verifySellerLogin() {
        cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
            const LoggedInUser = $Loggedin.text()
            cy.log(Cypress.env('sellerEmail'))
            expect(LoggedInUser).to.contain(Cypress.env("sellerEmail"))
        })
    }


}

export const admin = new adminFunctions()