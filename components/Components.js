import { expect } from '@playwright/test' ;

export class Componentes {
   constructor(page) {
        this.page = page;
    }

    async ValidarToastMensagem(mensagem) {
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(mensagem);
        await expect(toast).toBeHidden({ timeout: 5000 });
    }

    async ValidarPopupMensagem(mensagem) {
        const popup = this.page.locator('.swal2-popup #swal2-html-container');
        await expect(popup).toContainText(mensagem);
    }

    async ValidarAlertMensagem(mensagem) {
        const alert = this.page.locator('span[class$=alert]');
        await expect(alert).toHaveText(mensagem);
    }
}