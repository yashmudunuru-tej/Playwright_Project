const { expect } = require("@playwright/test");
const { log } = require("console");

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.backpackAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikeLightAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.redShirtAddBtn = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    //sorting
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.priceElements = page.locator('[data-test="inventory-item-price"]');
    this.productNames=page.locator('[data-test="inventory-item-name"]');
  }

  async isOnInventoryPage() {
    await this.pageTitle.waitFor();
    await expect(this.pageTitle).toHaveText('Products',"Login Succesful, Inventory Page is loaded and title displayed");
  }

  async addBackpackToCart() {
    await this.backpackAddBtn.click();
  }

  async addBikeLightToCart() {
    await this.bikeLightAddBtn.click();
  }

  async addRedShirtToCart() {
    await this.redShirtAddBtn.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async validateCartItemCount(count) {
    const c=await this.cartBadge.innerText();
    expect(c).toBe(count);
  }

  async validateSortByPriceLowToHigh() {
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption('Price (low to high)');

    const count = await this.priceElements.count();
    const prices = [];
    for (let i = 0; i < count; i++) {
      const text = await this.priceElements.nth(i).textContent();
      const price = parseFloat(text.replace('$', ''));
      prices.push(price);
    }
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async validateSortByPriceHighToLow() {
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption('Price (high to low)');

    const count = await this.priceElements.count();
    const prices = [];
    for (let i = 0; i < count; i++) {
      const text = await this.priceElements.nth(i).textContent();
      const price = parseFloat(text.replace('$', ''));
      prices.push(price);
    }
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  async validateNameDescending(){
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption('Name (Z to A)');
    const count= await this.productNames.count();
    const names=[];
    for (let i = 0; i < count; i++) {
      const text = await this.productNames.nth(i).textContent();
      names.push(text);
    }
    const expected=[...names].sort().reverse();
    expect(names).toEqual(expected);
  }

  async validateNameAscending(){
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption('Name (A to Z)');
    const count= await this.productNames.count();
    const names=[];
    for (let i = 0; i < count; i++) {
      const text = await this.productNames.nth(i).textContent();
      names.push(text);
    }
    const expected=[...names].sort();
    expect(names).toEqual(expected);
  }


};
