class InfoPage {
  constructor() {
    this.title = '.title'
    this.firstName = '[data-test=firstName]'
    this.lastName = '[data-test=lastName]'
    this.postalCode = '[data-test=postalCode]'
  }

  fillInfo(userInfo) {
    cy.get(this.firstName).type(userInfo.firstName)
    cy.get(this.lastName).type(userInfo.lastName)
    cy.get(this.postalCode).type(userInfo.postalCode)
  }
}

export default InfoPage