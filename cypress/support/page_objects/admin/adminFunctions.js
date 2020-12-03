
export class adminFunctions {




    // it('Opens the Admin Login Page', () => {
    //   cy.visit(data.AdminURL)
    //   cy.title().should('eq','TCGplayer.com Seller Control Panel - Login/Register')
    //   cy.AdminLogin (data.email, data.password)

    setAdminAuthCookie() {
        cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueAdmin"), { httpOnly: true })
    }

    setSellerAuthCookie() {
        cy.setCookie(Cypress.env("oauthCookieName"), Cypress.env("oauthCookieValueSeller"), { httpOnly: true })
    }

    visitPartialRefundPage() {
        cy.visit(Cypress.env("partialRefundPageUrl"))
    }



    averifyAdminLogin() {
        cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
            const LoggedInUser = $Loggedin.text()
            cy.log(Cypress.env('adminEmail'))
            expect(LoggedInUser).to.contain(Cypress.env("adminEmail"))

        })
    }

    verifyAdminLogin() {
        cy.fixture('admin/admin').then(function (data) {
            this.data = data
            cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
                const LoggedInUser = $Loggedin.text()
                cy.log(this.data.adminEmail)
                expect(LoggedInUser).to.contain(this.data.adminEmail)
            })
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