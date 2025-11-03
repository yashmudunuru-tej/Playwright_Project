const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

//testing comment
test.describe('End-to-End Checkout Flow', () => {
  test('User can complete a purchase successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    //Validate Sort functionality in homepage
    await inventoryPage.isOnInventoryPage();
    await inventoryPage.validateSortByPriceLowToHigh();
    await inventoryPage.validateSortByPriceHighToLow();
    await inventoryPage.validateNameDescending();
    

    // Add items to cart and validate
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.addRedShirtToCart();
    await inventoryPage.validateCartItemCount('3');
    await inventoryPage.openCart();

    //Validate cart items
    const items = await cartPage.getCartItemNames();
    expect(items, 'Expected 3 specific items in cart').toEqual([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Test.allTheThings() T-Shirt (Red)',
      ]);

    //Validate Remove item from cart and vaidate
    await cartPage.removeItemandValidate();
    await inventoryPage.validateCartItemCount('2');

    //Proceed to Checkout Page
    await cartPage.proceedToCheckoutButton();

    // Filling Checkout User details
    await cartPage.fillUserDetails('Arjuna', 'QA', '500084');

    //Validate Checkout details
    await cartPage.validateCheckoutPageDetails();
    await cartPage.clickFinishButton();

    // Success message
    await cartPage.validateOrderSuccess();

  });
});
