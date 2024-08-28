class LoginPage {
    getUserNameField() {
        return cy.get('#user-name')
    }

    getPasswordField() {
        return cy.get('#password')
    }

    getLoginButton() {
        return cy.get('[data-test="login-button"]')
    }
}

export default LoginPage;