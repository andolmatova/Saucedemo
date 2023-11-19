import { expect, type Page } from '@playwright/test';

export default class InventoryPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------
  BURGER_MENU_BTN = '#react-burger-menu-btn';
  
  // Actions
  //-------------------------------------------------------
  public async expectInventoryPageOpened() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}
