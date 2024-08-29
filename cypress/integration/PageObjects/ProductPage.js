class ProductPage {
  constructor() {
    this.sortContainer = '[data-test=product-sort-container]'
    this.burgerMenu = '[id=react-burger-menu-btn]'
    this.logoutBtn = '[id=logout_sidebar_link]'
    this.sauceLabsBackPackCartBtn = '[data-test="add-to-cart-sauce-labs-backpack"]'
    this.sauceLabsBikeLightCartBtn ='[data-test="add-to-cart-sauce-labs-bike-light"]'
    this.sauceLabsBackPackRemoveBtn = '[data-test="remove-sauce-labs-backpack"]'
    this.sauceLabsBikeLightRemoveBtn = '[data-test="remove-sauce-labs-bike-light"]'
    this.cartBadge = '.shopping_cart_badge'
    this.cartLink = '.shopping_cart_link'
  }

  getBackpackDetails() {
    const backpack = {
      name: '#item_4_title_link > .inventory_item_name',
      desc: ':nth-child(1) > .inventory_item_description > .inventory_item_label > .inventory_item_desc',
      price: ':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price',
      img: '#item_4_img_link > .inventory_item_img'
    }

    return backpack
  }

  getBikeLightDetails() {
    const bikelight = {
      // name: 
    }

    return bikelight
  }


  logout() {
    cy.get(this.burgerMenu).click()
    cy.get(this.logoutBtn).click()
  }

  sortByNameAZ() {
    // cy.get('[data-test=product_sort_container]').select('Name (A to Z)')
    cy.get(this.sortContainer).select('az')
  }

  sortByNameZA() {
    cy.get(this.sortContainer).select('Name (Z to A)')
  }

  sortByPriceLH() {
    cy.get(this.sortContainer).select('Price (low to high)')
  }

  sortByPriceHL() {
    cy.get(this.sortContainer).select('Price (high to low)')
  }
}

export default ProductPage;