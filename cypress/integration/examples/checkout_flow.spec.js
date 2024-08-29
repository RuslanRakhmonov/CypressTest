import { faker } from '@faker-js/faker'
import ProductPage from '../PageObjects/ProductPage'
import CartPage from '../PageObjects/CartPage'
import InfoPage from '../PageObjects/InfoPage'
import OverviewPage from '../PageObjects/OverviewPage'
import CompletePage from '../PageObjects/CompletePage'
import LoginPage from '../PageObjects/LoginPage'

describe('Order completion and cancellation', () => {
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const infoPage = new InfoPage()
  const overviewPage = new OverviewPage()
  const completePage = new CompletePage()
  const loginPage = new LoginPage()

  beforeEach(function() {
    cy.fixture('products').then(function(productsJSON) {
        this.productsJSON = productsJSON
      })
      cy.visit('/')
      loginPage.getUserNameField().type('standard_user')
      loginPage.getPasswordField().type('secret_sauce')
      loginPage.getLoginButton().click()
    })

  
  describe('Check out flow from start to finish', function() {
    it('Can add two items, checkout, verify price and complete order', async function() {
      const productsJSON = this.productsJSON

      // add two products to shopping cart
      addTwoProductsToCart()

      // go to cart and checkout
      gotoCartCheckout()

      // checkout: your information
      fillUserInfo()

      // checkout: overview
      await verifyPriceTotal(productsJSON)

      // checkout: complete
      verifyComplete(completePage)
    })
  })

  describe('Cancel order', function() {
    it('should be able to cancel order from the product page ', function() {
      // add two products to shopping cart
      addTwoProductsToCart()

      cy.get(productPage.sauceLabsBackPackRemoveBtn).click()
      cy.get(productPage.sauceLabsBikeLightRemoveBtn).click()
      cy.get(productPage.cartBadge).should('not.exist')
    })
  })


  function addTwoProductsToCart() {
    cy.get(productPage.sauceLabsBackPackCartBtn).click()
    cy.get(productPage.cartBadge).should('have.text','1')
    cy.get(productPage.sauceLabsBikeLightCartBtn).click()
    cy.get(productPage.cartBadge).should('have.text','2')
  }

  function gotoCartCheckout() {
    cy.get(productPage.cartLink).click()
    cy.get(cartPage.title)
      .should('have.text', 'Your Cart')
    cartPage.checkout()
  }

  function fillUserInfo() {
    // use of faker module to generate user info on the fly
    const userInfo = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode()
    }

    infoPage.fillInfo(userInfo)
    cy.get('[data-test=continue]').click()
  }

  async function verifyPriceTotal(productsJSON) {
    const expectedItemTotal = 
      Number(productsJSON[0].inventory_item_price.replace(/\$/g, '')) +
      Number(productsJSON[1].inventory_item_price.replace(/\$/g, ''))

    // assert item totals without tax
    cy.get(overviewPage.subtotal).should('have.text', `Item total: $${expectedItemTotal}`)

    // assert tax amount exists, we don't know the expected tax rate, but it should be visible
    cy.get(overviewPage.tax).should('be.visible')

    // extracting tax label
    const taxLabel = await (cy
      .get(overviewPage.tax)
      .then($el => $el.text()))
    const expectedTotal = expectedItemTotal + Number(taxLabel.split('$')[1])

    // assert total price including tax
    cy.get(overviewPage.total).should('have.text', `Total: $${expectedTotal}`)
    cy.get('[data-test=finish]').click()
  }

  function verifyComplete() {
    cy.get(completePage.title).should('have.text', 'Checkout: Complete!')
    cy.get(completePage.header).should('have.text', 'THANK YOU FOR YOUR ORDER')
    cy.get(completePage.completeIcon).should('be.visible')
    cy.get(productPage.cartBadge).should('not.exist')
  }
})