/// <reference types="Cypress" />
import ProductPage from '../PageObjects/ProductPage'
import LoginPage from '../PageObjects/LoginPage'

describe('Product', () => {
  const productPage = new ProductPage()
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.fixture('example').then(function(userData) {
      this.userData = userData
    })
    cy.fixture('products').then(function(productsJSON) {
      this.productsJSON = productsJSON
    })
    cy.visit('/')
    loginPage.getUserNameField().type('standard_user')
    loginPage.getPasswordField().type('secret_sauce')
    loginPage.getLoginButton().click()
  })

  describe('Collapsable menu opens and its selections are present', function() {
    it('collapsable menu opens and its selections are present', function() {
      
      cy.get('#react-burger-menu-btn').click()
      cy.get('#inventory_sidebar_link').should('be.visible')
      cy.get('#about_sidebar_link').should('be.visible')
      cy.get('#logout_sidebar_link').should('be.visible')
      cy.get('#reset_sidebar_link').should('be.visible')
    })
  })

  describe('Sorting options for products page', function() {
    it('can sort by Name (A-Z)', function() {
      const productsJSON = this.productsJSON
      let itemNames = getItemNames(productsJSON)

      // expected order
      itemNames.sort()

      // sort action
      productPage.sortByNameAZ()

      // verify the names order
      verifyNamesOrder(itemNames)
    })

    it('can sort by Name (Z-A)', function() {
      const productsJSON = this.productsJSON
      let itemNames = getItemNames(productsJSON)

      // expected order
      itemNames.reverse()

      // sort action
      productPage.sortByNameZA()

      // verify the names order
      verifyNamesOrder(itemNames)
    })

    it('can sort by Price (low to high)', function() {
      const productsJSON = this.productsJSON
      let itemPrices = getItemPrices(productsJSON)
      // remove the leading $ sign for price sorting
      itemPrices = itemPrices.map(x => x.replace(/\$/g, ''))

      // expected order
      itemPrices.sort((a,b) => a - b)

      // sort action
      productPage.sortByPriceLH()

      // verify the prices order
      verifyPricesOrder(itemPrices)
    })

    it('can sort by Price (high to low)', function() {
      const productsJSON = this.productsJSON
      let itemPrices = getItemPrices(productsJSON)
      // remove the leading $ sign for price sorting
      itemPrices = itemPrices.map(x => x.replace(/\$/g, ''))

      // expected order
      itemPrices.sort((a,b) => b - a)

      // sort action
      productPage.sortByPriceHL()

      // verify the prices order
      verifyPricesOrder(itemPrices)
    })
  })

  function verifyNamesOrder(itemNames) {
    for (let i = 0; i < itemNames.length; i++) {
      cy.get(`:nth-child(${i+1}) > .inventory_item_description`)
      .find('.inventory_item_name')
      .should('have.text', itemNames[i])
    }
  }

  function getItemNames(productsJSON) {
    let itemNames = []
    for (let el of productsJSON) {
      itemNames.push(el.inventory_item_name)
    }

    return itemNames
  }

  function getItemPrices(productsJSON) {
    let itemPrices = []
    for (let el of productsJSON) {
      itemPrices.push(el.inventory_item_price)
    }

    return itemPrices
  }

  function verifyPricesOrder(itemPrices) {
    for (let i = 0; i < itemPrices.length; i++) {
      cy.get(`:nth-child(${i+1}) > .inventory_item_description`)
        .find('.inventory_item_price')
        .should('have.text', `$${itemPrices[i]}`)
    }
  }
})