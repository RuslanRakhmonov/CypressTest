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

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }
}

export default LoginPage;