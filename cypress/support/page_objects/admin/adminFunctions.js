
export class adminFunctions {




    // it('Opens the Admin Login Page', () => {
    //   cy.visit(data.AdminURL)
    //   cy.title().should('eq','TCGplayer.com Seller Control Panel - Login/Register')
    //   cy.AdminLogin (data.email, data.password)



    headlessLoginAdminSite(userName, password)  {
        cy.request({
            method: 'POST',
            url: 'https://store.tcgplayer-'+(Cypress.env("env"))+'.com/admin/Account/LogOn', 
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
              userName: userName,
              password: password,
              requireCaptcha: 'false',
              captchaToken: 'literally anything'  //Literally.... anything goes here
            }
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
    
    visitPartialRefundPage() {
        cy.visit(Cypress.env("partialRefundPageUrl"))
    }


}

export const admin = new adminFunctions()