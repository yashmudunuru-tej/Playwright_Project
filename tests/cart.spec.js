const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Cart Functionality', () => {
  test('User can add products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.isOnInventoryPage();
    await inventoryPage.validateSortByPriceLowToHigh();
    await inventoryPage.validateSortByPriceHighToLow();
    await inventoryPage.validateNameDescending();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.addRedShirtToCart();

    const itemCount = await inventoryPage.validateCartItemCount('3');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
  });

});
