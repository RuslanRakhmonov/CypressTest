/// <reference types="Cypress" />
import LoginPage from "../PageObjects/LoginPage";

describe('Verify Login Page functionality', () => {
    before(() => {
        cy.fixture('example').then(function(data) {
            this.data = data;
        })
        cy.visit('https://www.saucedemo.com/')
    })

    it('Verify login with valid credentials', function() {
        const loginPage = new LoginPage();
        loginPage.getUserNameField().type(this.data.userName)
        loginPage.getPasswordField().type(this.data.password)
        loginPage.getLoginButton().click()
        cy.url().should('include', 'inventory');
    })

    it('Verify login with valid credentials', function() {
        const loginPage = new LoginPage();
        loginPage.getUserNameField().type(this.data.userName)
        loginPage.getPasswordField().type(this.data.password)
        loginPage.getLoginButton().click()
        cy.url().should('include', 'inventory');
    })
    
})