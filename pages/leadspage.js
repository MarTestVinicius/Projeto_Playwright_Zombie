const { expect } = require('@playwright/test');
export class LeadsPage {

    constructor(page) {
        this.page = page;
    }

    async IrPaginaInicial() {
        await this.page.goto('http://localhost:3000/');
    }

    async AbrirModal() {
        await this.page.getByText('Aperte o play... se tiver coragem').click();
    }

    async ValidarTituloModal() {
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera'); //validando o título do modal
    }

    async PreencherFormularioNomeEmail(nome, email) {
        await this.page.locator('#name').fill(nome);//  await this.page.getByPlaceholder('Seu nome completo').fill('Marcus Vinicius');
        await this.page.locator('#email').fill(email); // await this.page.getByPlaceholder('Seu email principal').fill('marquitoswim@gmail.com');
        await this.page.getByTestId('modal').getByRole('button', { name: 'Quero entrar na fila!' }).click();

    }

    async ValidarMensagemSucesso() {
        const toast_message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
        await expect(this.page.locator('.toast')).toHaveText(toast_message);
        await expect(this.page.locator('.toast')).toBeHidden({ timeout: 4000 });
    }

    async ValidarMensagemErroEmailInvalido() {
        await expect(this.page.locator('.alert')).toHaveText('Email incorreto');
    }


    async ValidarMensagemErroCampoObrigatorioNome() {
        await expect(this.page.locator('.alert')).toHaveText('Campo obrigatório');

    }

    async ValidarMensagemErroCampoObrigatorioEmail() {
        await expect(this.page.locator('.alert')).toHaveText('Campo obrigatório');

    }
    async ValidarMensagemErroCampoObrigatorioNome_Email() {
        await expect(this.page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório']);
    }
}