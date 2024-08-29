/// <reference types="Cypress" />
import LoginPage from "../PageObjects/LoginPage";

describe('Verify Login Page functionality', () => {
    beforeEach(() => {
        cy.fixture('example').then(function(data) {
            this.data = data;
        })
        cy.visit('/')
    })

    it('Verify login with valid credentials', function() {
        const loginPage = new LoginPage();
        loginPage.getUserNameField().type(this.data.userName)
        loginPage.getPasswordField().type(this.data.password)
        loginPage.getLoginButton().click()
        cy.url().should('include', 'inventory');
    })

    it('Verify login with invalid credentials', function() {
        const loginPage = new LoginPage();
        loginPage.getUserNameField().type(this.data.invalidUserName)
        loginPage.getPasswordField().type(this.data.password)
        loginPage.getLoginButton().click()
        loginPage.getErrorMessage().should('be.visible')   
    })

    it('Verify login with invalid credentials', function() {
        const loginPage = new LoginPage();
        loginPage.getUserNameField().type(this.data.userName)
        loginPage.getPasswordField().type(this.data.invalidPassword)
        loginPage.getLoginButton().click()
        loginPage.getErrorMessage().should('be.visible')     
    })
    
})