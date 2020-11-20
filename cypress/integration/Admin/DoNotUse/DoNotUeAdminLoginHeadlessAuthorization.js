/// <reference types="cypress" />

describe('Login Headless Authorization', () => {
  
  var data=require('../../fixtures/Admin')
   
it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  const userCredentials = "UserName=admin%40auto.com&Password=P%40ssw0rd%21&CaptchaToken=03AGdBq26RRRLCQec6qg4S7HXovbYIr3OJ484YjRQvxKsAym2ncIZfI1IX6_KeHEhaKGKEExT5xDi0_GG7ZhvzePtObhGa6aZjkd1QG4J6_ch7vYl5bi--hLHYK9JTx39TTHxo8f9jl6W1NhSa0Zzhdvl4CvxPK9CUxcRUId2YqtC7uMJvRt8_6rfUN6L_qST0S76DLjKDqtrK9M4jjdBqSSTrVrBxc2N2MLf7m8nAvvpliLfZ6I-VGyazpxIuhpCoyWRbjyWoU8mgAz465K_hjGO3bnyBwGv-OR411RdjkCVAl78wuxILYk6Q_-0I_DrH9x3D5oSJqK6_CmLiLl_jV3ePbz-Q4cUWGLb8Bgpmr7l3b7ei86i8rsk5hfuF7Yzubsz85bvSkQ2PUD6Js8hwBWxZet-Z-sByVU6xj49ztMSiwKlQF4ejynrPHLIsGvQ_2GPLQjixaBCs&RequireCaptcha=false"
  cy.request('POST', 'https://store.tcgplayer-qa.com/admin/Account/LogOn', userCredentials) 
  })      
  
it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  const userCredentials = "UserName=admin%40auto.com&Password=P%40ssw0rd%21&CaptchaToken=03AGdBq26RRRLCQec6qg4S7HXovbYIr3OJ484YjRQvxKsAym2ncIZfI1IX6_KeHEhaKGKEExT5xDi0_GG7ZhvzePtObhGa6aZjkd1QG4J6_ch7vYl5bi--hLHYK9JTx39TTHxo8f9jl6W1NhSa0Zzhdvl4CvxPK9CUxcRUId2YqtC7uMJvRt8_6rfUN6L_qST0S76DLjKDqtrK9M4jjdBqSSTrVrBxc2N2MLf7m8nAvvpliLfZ6I-VGyazpxIuhpCoyWRbjyWoU8mgAz465K_hjGO3bnyBwGv-OR411RdjkCVAl78wuxILYk6Q_-0I_DrH9x3D5oSJqK6_CmLiLl_jV3ePbz-Q4cUWGLb8Bgpmr7l3b7ei86i8rsk5hfuF7Yzubsz85bvSkQ2PUD6Js8hwBWxZet-Z-sByVU6xj49ztMSiwKlQF4ejynrPHLIsGvQ_2GPLQjixaBCs&RequireCaptcha=false"
  cy.request('POST', 'https://store.tcgplayer-qa.com/admin/Account/LogOn', userCredentials)   
  cy.visit("https://store.tcgplayer-qa.com/admin/Home/AdminIndex")
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
    const LoggedInUser = $Loggedin.text()
    expect(LoggedInUser).to.contain(data.email)  
    })
})

it('Admin Login Headless Authorization', ()  => {
  cy.server()    
  const userCredentials = "UserName=admin%40auto.com&Password=P%40ssw0rd%21&CaptchaToken=03AGdBq26RRRLCQec6qg4S7HXovbYIr3OJ484YjRQvxKsAym2ncIZfI1IX6_KeHEhaKGKEExT5xDi0_GG7ZhvzePtObhGa6aZjkd1QG4J6_ch7vYl5bi--hLHYK9JTx39TTHxo8f9jl6W1NhSa0Zzhdvl4CvxPK9CUxcRUId2YqtC7uMJvRt8_6rfUN6L_qST0S76DLjKDqtrK9M4jjdBqSSTrVrBxc2N2MLf7m8nAvvpliLfZ6I-VGyazpxIuhpCoyWRbjyWoU8mgAz465K_hjGO3bnyBwGv-OR411RdjkCVAl78wuxILYk6Q_-0I_DrH9x3D5oSJqK6_CmLiLl_jV3ePbz-Q4cUWGLb8Bgpmr7l3b7ei86i8rsk5hfuF7Yzubsz85bvSkQ2PUD6Js8hwBWxZet-Z-sByVU6xj49ztMSiwKlQF4ejynrPHLIsGvQ_2GPLQjixaBCs&RequireCaptcha=false"
  cy.request('POST', 'https://store.tcgplayer-qa.com/admin/Account/LogOn', userCredentials)   
  cy.visit("https://store.tcgplayer-qa.com/admin/orders/OrderList")
  cy.get("#header > div.tcg_admin > div.mUser_wrapper > div").then(($Loggedin) => {
    const LoggedInUser = $Loggedin.text()
    expect(LoggedInUser).to.contain(data.email)  
    })
})

})
  