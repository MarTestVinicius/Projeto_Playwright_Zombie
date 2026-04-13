const { expect } = require('@playwright/test');

export class AdminPage {

    constructor(page) {
        this.page = page;
    }


async ValidarLoginAdminSucesso() {
        await this.page.waitForLoadState('networkidle');//esperar a página carregar completamente
        //const logoutButton = this.page.getByText('Sair');//localizar o botão de logout usando um seletor de texto
        const logoutbutton2 = this.page.locator('a[href="/logout"]');//localizar o botão de logout usando um seletor CSS
        await expect(logoutbutton2).toBeVisible();//verificar se o botão de logout está visível, indicando que o login foi bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/);//verificar se a URL contém "/admin", indicando que o usuário foi redirecionado para a página de administração após o login bem-sucedido
    }
}