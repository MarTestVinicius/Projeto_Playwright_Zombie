const { expect } = require('@playwright/test');
const { Toast } = require('../components/Components');
const { MoviePage } = require ('../pages/moviePage');


export class LoginPage {

    constructor(page) {
        this.page = page;
        this.toast = new Toast(this.page);
        this.movies = new MoviePage(this.page);
    }

    async IrPaginaInicialLoginAdmin() {
        await this.page.goto('http://localhost:3000/admin/login');
        const LoginformModal = this.page.locator('.login-form');
        await expect(LoginformModal).toBeVisible();
    }

    async SubmitFormularioAdmin(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByRole('button', { name: 'Entrar' }).click();
    }

    async ValidarLoginAdminFalha() {
        const errorMessage = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
       await this.toast.ValidarPopupMensagem(errorMessage);
    }

     async ValidarLoginAdminFalhaEstruturaEmail() {
        const errorMessage = 'Email incorreto';
       await this.toast.ValidarAlertMensagem(errorMessage);
    }

    async ValidarLoginAdminFalhaCamposEmailVazio() {
        const erromensagem = 'Campo obrigatório';
       await this.toast.ValidarAlertMensagem(erromensagem);
    }

    async ValidarLoginAdminFalhaCamposEmailSenhaVazio() {
         const mensagem = ['Campo obrigatório', 'Campo obrigatório'];
        await this.toast.ValidarAlertMensagem(mensagem);
    }

    async ValidarLoginAdminFalhaCamposSenhaVazio() {
        const erromensagem = 'Campo obrigatório';
       await this.toast.ValidarAlertMensagem(erromensagem);
    }
}
