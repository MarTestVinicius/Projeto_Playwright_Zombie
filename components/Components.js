const { expect } = require('@playwright/test');

export class Toast {
   constructor(page) {
        this.page = page;
    }

    async ValidarToastMensagem(mensagem) {
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(mensagem);
        await expect(toast).toBeHidden({ timeout: 5000 });
    }

    async ValidarAlertMensagem(mensagem) {
        const alert = this.page.locator('span[class$=alert]');
        await expect(alert).toHaveText(mensagem);
    }
}