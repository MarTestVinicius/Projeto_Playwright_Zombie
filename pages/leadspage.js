const { expect } = require('@playwright/test');
const { Componentes } = require('../components/Components');

export class LeadsPage {

    constructor(page) {
        this.page = page;
        this.componentes = new Componentes(this.page);
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
        const toast_message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato';
        await this.componentes.ValidarPopupMensagem(toast_message);
    }

    async ValidarMensagemErroUsuariocCadastrado() {
        const toast_message = 'e-mail fornecido já consta em nossa lista de espera.';
        await this.componentes.ValidarPopupMensagem(toast_message);
    }

    async ValidarMensagemErroEmailInvalido() {
        const mensagem = 'Email incorreto';
        await this.componentes.ValidarAlertMensagem(mensagem);
    }


    async ValidarMensagemErroCampoObrigatorioNome() {
        const mensagem = 'Campo obrigatório';
        await this.componentes.ValidarAlertMensagem(mensagem);
    }

    async ValidarMensagemErroCampoObrigatorioEmail() {
        const mensagem = 'Campo obrigatório';
        await this.componentes.ValidarAlertMensagem(mensagem);
    }
    async ValidarMensagemErroCampoObrigatorioNome_Email() {
        const mensagem = ['Campo obrigatório', 'Campo obrigatório'];
        await this.componentes.ValidarAlertMensagem(mensagem);
    }
}