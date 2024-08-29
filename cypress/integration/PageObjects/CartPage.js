class CartPage {
  constructor() {
    this.checkoutBtn = '[data-test=checkout]'
    this.title = '.title'
  }

  checkout() {
    cy.get(this.checkoutBtn).click()
  }
}

export default CartPage