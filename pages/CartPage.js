const { expect } = require("@playwright/test");

exports.CartPage = class CartPage {
  constructor(page) {
    //cart main page
    this.page = page;
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    //checkout information page
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    //checkout overview page
    this.finishBtn = page.locator('[data-test="finish"]');
    //checkout complete page
    this.successHeader = page.locator('.complete-header');
    //checkout overview
    this.checkoutoverviewtitle=page.locator('[data-test="title"]');
    this.checkoutoverviewpaymentlabel=page.locator('[data-test="payment-info-label"]');
    this.checkoutoverviewshippinglabel=page.locator('[data-test="shipping-info-label"]');
    this.checkoutoverviewtotalinfo=page.locator('[data-test="total-info-label"]');
    this.checkoutoverviewtotallabel=page.locator('[data-test="total-label"]');
    this.removebackpackbutton=page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.backpacklabelincart=page.locator("//div[@data-test='inventory-item-name'][contains(text(),'Sauce Labs Backpack')]");
    this.labsbikelight=page.locator("//div[contains(text(),'Sauce Labs Bike Light')]");
    this.tshirt=page.locator("//div[contains(text(),'Test.allTheThings() T-Shirt (Red)')]");
  }

  async proceedToCheckoutButton() {
    await this.checkoutBtn.click();
  }
  async fillUserDetails(firstName, lastName, postalCode){
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  async validateCheckoutPageDetails(){
  await expect(this.checkoutoverviewtitle).toHaveText('Checkout: Overview');
  await expect(this.checkoutoverviewpaymentlabel).toHaveText('Payment Information:');
  await expect(this.checkoutoverviewshippinglabel).toHaveText('Shipping Information:');
  await expect(this.checkoutoverviewtotalinfo).toHaveText('Price Total');
  await expect(this.checkoutoverviewtotallabel).toContainText('Total:');
  await expect(this.labsbikelight).toBeVisible();
  await expect(this.tshirt).toBeVisible();
  }

  async clickFinishButton(){
    await this.finishBtn.click();
  }

  async validateOrderSuccess() {
    await this.successHeader.waitFor();
    await expect(this.successHeader).toHaveText('Thank you for your order!');
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async removeItemandValidate(){
    await this.removebackpackbutton.click();
    const backpacklable= await this.backpacklabelincart.isVisible();
    expect(backpacklable).toBe(false);
  }

};
