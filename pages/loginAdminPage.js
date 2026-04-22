import { expect } from '@playwright/test';
import { Componentes } from '../components/Components';
import { MoviePage } from  '../pages/moviePage';


export class LoginPage {

    constructor(page) {
        this.page = page;
        this.componentes = new Componentes(this.page);
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
       await this.componentes.ValidarPopupMensagem(errorMessage);
    }

     async ValidarLoginAdminFalhaEstruturaEmail() {
        const errorMessage = 'Email incorreto';
       await this.componentes.ValidarAlertMensagem(errorMessage);
    }

    async ValidarLoginAdminFalhaCamposEmailVazio() {
        const erromensagem = 'Campo obrigatório';
       await this.componentes.ValidarAlertMensagem(erromensagem);
    }

    async ValidarLoginAdminFalhaCamposEmailSenhaVazio() {
         const mensagem = ['Campo obrigatório', 'Campo obrigatório'];
        await this.componentes.ValidarAlertMensagem(mensagem);
    }

    async ValidarLoginAdminFalhaCamposSenhaVazio() {
        const erromensagem = 'Campo obrigatório';
       await this.componentes.ValidarAlertMensagem(erromensagem);
    }
}
